import {
  type PrismaClient,
  type Team,
  type TeamMembers,
  type User,
  type Prisma,
} from "@prisma/client";

export interface TeamWithMembers extends Team {
  members: (TeamMembers & {
    user: Pick<User, "id" | "name" | "email" | "image" | "role">;
  })[];
  memberCount: number;
}

export type UserTeamMembership = Prisma.TeamMembersGetPayload<{
  include: {
    team: {
      include: {
        members: {
          include: {
            user: true;
          };
        };
      };
    };
    user: {
      select: {
        id: true;
        name: true;
        email: true;
        image: true;
        role: true;
      };
    };
  };
}>;

export interface CreateTeamData {
  name: string;
  memberIds: string[];
}

export default class MembersService {
  constructor(private readonly db: PrismaClient) {}

  /**
   * Get all users available for team membership
   */
  async getAllUsers(): Promise<
    Pick<User, "id" | "name" | "email" | "image" | "role">[]
  > {
    return this.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  /**
   * Get teams that a specific user is a member of
   */
  async getUserTeams(userId: string): Promise<UserTeamMembership[]> {
    return this.db.teamMembers.findMany({
      where: {
        userId,
      },
      include: {
        team: { include: { members: { include: { user: true } } } },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
      orderBy: {
        team: {
          name: "asc",
        },
      },
    });
  }

  /**
   * Get teams that a user is NOT a member of (available to join)
   */
  async getAvailableTeams(userId: string): Promise<TeamWithMembers[]> {
    // First get all team IDs that the user is already a member of
    const userTeamMemberships = await this.db.teamMembers.findMany({
      where: {
        userId,
      },
      select: {
        teamId: true,
      },
    });

    const userTeamIds = userTeamMemberships.map(
      (membership) => membership.teamId
    );

    // Get all teams that the user is NOT a member of
    const teams = await this.db.team.findMany({
      where: {
        id: {
          notIn: userTeamIds,
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Add member count to each team
    return teams.map((team) => ({
      ...team,
      memberCount: team.members.length,
    }));
  }

  /**
   * Create a new team with specified members
   */
  async createTeam(
    data: CreateTeamData,
    createdByUserId: string
  ): Promise<TeamWithMembers> {
    // Validate that all member IDs exist
    const validUsers = await this.db.user.findMany({
      where: {
        id: {
          in: data.memberIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (validUsers.length !== data.memberIds.length) {
      throw new Error("One or more user IDs are invalid");
    }

    // Create team with members in a transaction
    const result = await this.db.$transaction(async (tx) => {
      // Create the team
      const team = await tx.team.create({
        data: {
          name: data.name,
        },
      });

      // Add all members to the team (including creator if not already included)
      const allMemberIds = [...new Set([...data.memberIds, createdByUserId])];

      await tx.teamMembers.createMany({
        data: allMemberIds.map((userId) => ({
          teamId: team.id,
          userId,
        })),
      });

      // Return the team with its members
      return tx.team.findUnique({
        where: {
          id: team.id,
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                  role: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    });

    if (!result) {
      throw new Error("Failed to create team");
    }

    return {
      ...result,
      memberCount: result.members.length,
    };
  }

  /**
   * Add a user to an existing team (join request)
   */
  async joinTeam(teamId: string, userId: string): Promise<UserTeamMembership> {
    // Check if team exists
    const team = await this.db.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    // Check if user is already a member
    const existingMembership = await this.db.teamMembers.findFirst({
      where: {
        teamId,
        userId,
      },
    });

    if (existingMembership) {
      throw new Error("User is already a member of this team");
    }

    // Add user to team
    const membership = await this.db.teamMembers.create({
      data: {
        teamId,
        userId,
      },
      include: {
        team: {
          include: {
            members: { include: { user: true } },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
    });

    return membership;
  }

  /**
   * Remove a user from a team
   * If the user is the last member, the team will be deleted
   */
  async leaveTeam(teamId: string, userId: string): Promise<void> {
    const membership = await this.db.teamMembers.findFirst({
      where: {
        teamId,
        userId,
      },
    });

    if (!membership) {
      throw new Error("User is not a member of this team");
    }

    // Check if this is the last member in the team
    const memberCount = await this.db.teamMembers.count({
      where: {
        teamId,
      },
    });

    await this.db.teamMembers.delete({
      where: {
        id: membership.id,
      },
    });

    if (memberCount === 1) {
      // This is the last member, delete the entire team
      await this.db.team.delete({
        where: {
          id: teamId,
        },
      });
    }
  }

  /**
   * Get detailed information about a specific team
   */
  async getTeamById(teamId: string): Promise<TeamWithMembers | null> {
    const team = await this.db.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!team) {
      return null;
    }

    return {
      ...team,
      memberCount: team.members.length,
    };
  }

  /**
   * Update team name
   */
  async updateTeam(
    teamId: string,
    data: { name: string },
    userId: string
  ): Promise<TeamWithMembers> {
    // Verify user is a member of the team
    const membership = await this.db.teamMembers.findFirst({
      where: {
        teamId,
        userId,
      },
    });

    if (!membership) {
      throw new Error("You must be a member of the team to update it");
    }

    // Update the team
    const updatedTeam = await this.db.team.update({
      where: {
        id: teamId,
      },
      data: {
        name: data.name,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return {
      ...updatedTeam,
      memberCount: updatedTeam.members.length,
    };
  }

  /**
   * Delete a team (only if user is a member)
   */
  async deleteTeam(teamId: string, userId: string): Promise<void> {
    // Verify user is a member of the team
    const membership = await this.db.teamMembers.findFirst({
      where: {
        teamId,
        userId,
      },
    });

    if (!membership) {
      throw new Error("You must be a member of the team to delete it");
    }

    // Delete the team (cascade will handle team members)
    await this.db.team.delete({
      where: {
        id: teamId,
      },
    });
  }
}
