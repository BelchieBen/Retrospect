import { Router } from "express";
import { db, poolConfig } from "../db";
import PostgresNotifier from "pg-realtime";
import MembersService from "../services/members-service";
import { hmacAuthMiddleware } from "../middleware/hmac-auth";

const router = Router();
const notifier = new PostgresNotifier(poolConfig);
const memberChannel = notifier.channel("member");
const membersService = new MembersService(db);

router.use(hmacAuthMiddleware);

/**
 * GET /members/users
 * Get all users available for team membership
 */
router.get("/users", async (req, res) => {
  try {
    req.logger.info("Fetching all users for team membership");
    const users = await membersService.getAllUsers();
    res.json(users);
  } catch (error) {
    req.logger.error({ error }, "Error fetching users");
    res.status(500).json({
      error: "Failed to fetch users",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /members/teams/my
 * Get teams that the current user is a member of
 */
router.get("/teams/my", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.logger.info({ userId }, "Fetching user teams");

    const userTeams = await membersService.getUserTeams(userId);
    res.json(userTeams);
  } catch (error) {
    req.logger.error({ error }, "Error fetching user teams");
    res.status(500).json({
      error: "Failed to fetch user teams",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /members/teams/available
 * Get teams that the current user can join
 */
router.get("/teams/available", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const search = req.query.search as string;

    req.logger.info({ userId, search }, "Fetching available teams");

    let availableTeams = await membersService.getAvailableTeams(userId);

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      availableTeams = availableTeams.filter((team) =>
        team.name.toLowerCase().includes(searchLower)
      );
    }

    res.json(availableTeams);
  } catch (error) {
    req.logger.error({ error }, "Error fetching available teams");
    res.status(500).json({
      error: "Failed to fetch available teams",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /members/teams/:teamId
 * Get detailed information about a specific team
 */
router.get("/teams/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    req.logger.info({ teamId }, "Fetching team details");

    const team = await membersService.getTeamById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    req.logger.error({ error }, "Error fetching team details");
    res.status(500).json({
      error: "Failed to fetch team details",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * POST /members/teams
 * Create a new team
 */
router.post("/teams", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, memberIds } = req.body;

    req.logger.info({ userId, name, memberIds }, "Creating new team");

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Team name is required" });
    }

    if (!Array.isArray(memberIds)) {
      return res.status(400).json({ error: "Member IDs must be an array" });
    }

    const team = await membersService.createTeam(
      { name: name.trim(), memberIds },
      userId
    );

    // Notify via real-time channel
    memberChannel.notify(
      JSON.stringify({
        type: "team_created",
        teamId: team.id,
        teamName: team.name,
        createdBy: userId,
        memberCount: team.memberCount,
      })
    );

    req.logger.info(
      { teamId: team.id, teamName: team.name },
      "Team created successfully"
    );
    res.status(201).json(team);
  } catch (error) {
    req.logger.error({ error }, "Error creating team");
    res.status(500).json({
      error: "Failed to create team",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * POST /members/teams/:teamId/join
 * Request to join a team
 */
router.post("/teams/:teamId/join", async (req, res) => {
  try {
    const userId = req.userId;
    const { teamId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required" });
    }

    req.logger.info({ userId, teamId }, "User requesting to join team");

    const membership = await membersService.joinTeam(teamId, userId);

    // Notify via real-time channel
    memberChannel.notify(
      JSON.stringify({
        type: "user_joined_team",
        teamId,
        userId,
        userName: membership.user.name,
        teamName: membership.team.name,
      })
    );

    req.logger.info({ userId, teamId }, "User joined team successfully");
    res.status(201).json(membership);
  } catch (error) {
    req.logger.error(
      { error, userId: req.userId, teamId: req.params.teamId },
      "Error joining team"
    );

    if (error instanceof Error) {
      if (error.message === "Team not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "User is already a member of this team") {
        return res.status(409).json({ error: error.message });
      }
    }

    res.status(500).json({
      error: "Failed to join team",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * DELETE /members/teams/:teamId/leave
 * Leave a team
 */
router.delete("/teams/:teamId/leave", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required" });
    }

    req.logger.info({ userId, teamId }, "User leaving team");

    await membersService.leaveTeam(teamId, userId);

    // Notify via real-time channel
    memberChannel.notify(
      JSON.stringify({
        type: "user_left_team",
        teamId,
        userId,
      })
    );

    req.logger.info({ userId, teamId }, "User left team successfully");
    res.status(204).send();
  } catch (error) {
    req.logger.error(
      { error, userId: req.userId, teamId: req.params.teamId },
      "Error leaving team"
    );

    if (
      error instanceof Error &&
      error.message === "User is not a member of this team"
    ) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({
      error: "Failed to leave team",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * PUT /members/teams/:teamId
 * Update team information
 */
router.put("/teams/:teamId", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { teamId } = req.params;
    const { name } = req.body;

    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required" });
    }

    req.logger.info({ userId, teamId, name }, "Updating team");

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Team name is required" });
    }

    const updatedTeam = await membersService.updateTeam(
      teamId,
      { name: name.trim() },
      userId
    );

    // Notify via real-time channel
    memberChannel.notify(
      JSON.stringify({
        type: "team_updated",
        teamId,
        teamName: updatedTeam.name,
        updatedBy: userId,
      })
    );

    req.logger.info(
      { teamId, teamName: updatedTeam.name },
      "Team updated successfully"
    );
    res.json(updatedTeam);
  } catch (error) {
    req.logger.error(
      { error, userId: req.userId, teamId: req.params.teamId },
      "Error updating team"
    );

    if (
      error instanceof Error &&
      error.message === "You must be a member of the team to update it"
    ) {
      return res.status(403).json({ error: error.message });
    }

    res.status(500).json({
      error: "Failed to update team",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * DELETE /members/teams/:teamId
 * Delete a team
 */
router.delete("/teams/:teamId", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required" });
    }

    req.logger.info({ userId, teamId }, "Deleting team");

    await membersService.deleteTeam(teamId, userId);

    // Notify via real-time channel
    memberChannel.notify(
      JSON.stringify({
        type: "team_deleted",
        teamId,
        deletedBy: userId,
      })
    );

    req.logger.info({ teamId }, "Team deleted successfully");
    res.status(204).send();
  } catch (error) {
    req.logger.error(
      { error, userId: req.userId, teamId: req.params.teamId },
      "Error deleting team"
    );

    if (
      error instanceof Error &&
      error.message === "You must be a member of the team to delete it"
    ) {
      return res.status(403).json({ error: error.message });
    }

    res.status(500).json({
      error: "Failed to delete team",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /members/test-auth
 * Test endpoint to verify HMAC authentication and logging are working
 */
router.get("/test-auth", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.logger.info({ userId }, "HMAC authentication test successful");
    res.json({
      success: true,
      message: "HMAC authentication is working",
      userId: userId,
      timestamp: req.hmacPayload?.timestamp,
      hasLogger: !!req.logger,
    });
  } catch (error) {
    req.logger.error({ error }, "HMAC authentication test failed");
    res.status(500).json({
      error: "Test failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
