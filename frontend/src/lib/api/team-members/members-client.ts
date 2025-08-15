/**
 * Typed API client for members endpoints
 * Uses dependency injection to accept any axios instance
 */

import type { AxiosInstance } from "axios";
import hmacAxios from "~/lib/hmac-axios";

// Types based on your Prisma schema
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
}

export interface Team {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface TeamWithMembers extends Team {
  members: TeamMember[];
}

export interface UserTeamMembership extends TeamMember {
  team: Team;
}

export interface CreateTeamData {
  name: string;
  memberIds: string[];
}

export interface UpdateTeamData {
  name: string;
}

/**
 * Members API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class MembersAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }
  /**
   * Get all users available for team membership
   */
  async getUsers(): Promise<User[]> {
    const response = await this.axios.get<User[]>("/members/users");
    return response.data;
  }

  /**
   * Get teams that the current user is a member of
   */
  async getMyTeams(): Promise<UserTeamMembership[]> {
    const response =
      await this.axios.get<UserTeamMembership[]>("/members/teams/my");
    return response.data;
  }

  /**
   * Get teams that the current user can join
   */
  async getAvailableTeams(search?: string): Promise<TeamWithMembers[]> {
    const params = search ? { search } : {};
    const response = await this.axios.get<TeamWithMembers[]>(
      "/members/teams/available",
      { params },
    );
    return response.data;
  }

  /**
   * Get detailed information about a specific team
   */
  async getTeam(teamId: string): Promise<TeamWithMembers> {
    const response = await this.axios.get<TeamWithMembers>(
      `/members/teams/${teamId}`,
    );
    return response.data;
  }

  /**
   * Create a new team
   */
  async createTeam(data: CreateTeamData): Promise<TeamWithMembers> {
    const response = await this.axios.post<TeamWithMembers>(
      "/members/teams",
      data,
    );
    return response.data;
  }

  /**
   * Update team information
   */
  async updateTeam(
    teamId: string,
    data: UpdateTeamData,
  ): Promise<TeamWithMembers> {
    const response = await this.axios.put<TeamWithMembers>(
      `/members/teams/${teamId}`,
      data,
    );
    return response.data;
  }

  /**
   * Delete a team
   */
  async deleteTeam(teamId: string): Promise<void> {
    await this.axios.delete(`/members/teams/${teamId}`);
  }

  /**
   * Request to join a team
   */
  async joinTeam(teamId: string): Promise<UserTeamMembership> {
    const response = await this.axios.post<UserTeamMembership>(
      `/members/teams/${teamId}/join`,
    );
    return response.data;
  }

  /**
   * Leave a team
   */
  async leaveTeam(teamId: string): Promise<void> {
    await this.axios.delete(`/members/teams/${teamId}/leave`);
  }

  /**
   * Test authentication (useful for debugging)
   */
  async testAuth(): Promise<{
    success: boolean;
    message: string;
    userId: string;
    timestamp?: number;
    hasLogger: boolean;
  }> {
    const response = await this.axios.get<{
      success: boolean;
      message: string;
      userId: string;
      timestamp?: number;
      hasLogger: boolean;
    }>("/members/test-auth");
    return response.data;
  }
}

// Create convenient instances for different environments
export const ClientMembersAPI = new MembersAPIClient(
  hmacAxios.getAxiosInstance(),
);

// Export the class as default for flexibility
export default MembersAPIClient;
