/**
 * React Query hooks for members API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ClientMembersAPI,
  type CreateTeamData,
  type UpdateTeamData,
} from "./members-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const membersKeys = {
  all: ["members"] as const,
  users: () => [...membersKeys.all, "users"] as const,
  teams: () => [...membersKeys.all, "teams"] as const,
  myTeams: () => [...membersKeys.teams(), "my"] as const,
  availableTeams: (search?: string) =>
    [...membersKeys.teams(), "available", search] as const,
  team: (teamId: string) => [...membersKeys.teams(), teamId] as const,
};

/**
 * Hook to get all users
 */
export function useUsers() {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: membersKeys.users(),
    queryFn: () => ClientMembersAPI.getUsers(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get user's teams
 */
export function useMyTeams() {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: membersKeys.myTeams(),
    queryFn: () => ClientMembersAPI.getMyTeams(),
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get available teams to join
 */
export function useAvailableTeams(search?: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: membersKeys.availableTeams(search),
    queryFn: () => ClientMembersAPI.getAvailableTeams(search),
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get specific team details
 */
export function useTeam(teamId: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: membersKeys.team(teamId),
    queryFn: () => ClientMembersAPI.getTeam(teamId),
    enabled: isAuthenticated && !!teamId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to create a team
 */
export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamData) => ClientMembersAPI.createTeam(data),
    onSuccess: () => {
      // Invalidate and refetch teams data
      void queryClient.invalidateQueries({ queryKey: membersKeys.myTeams() });
      void queryClient.invalidateQueries({
        queryKey: membersKeys.availableTeams(),
      });
    },
  });
}

/**
 * Hook to update a team
 */
export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, data }: { teamId: string; data: UpdateTeamData }) =>
      ClientMembersAPI.updateTeam(teamId, data),
    onSuccess: (data, variables) => {
      // Update the specific team in cache
      queryClient.setQueryData(membersKeys.team(variables.teamId), data);
      // Invalidate lists
      void queryClient.invalidateQueries({ queryKey: membersKeys.myTeams() });
      void queryClient.invalidateQueries({
        queryKey: membersKeys.availableTeams(),
      });
    },
  });
}

/**
 * Hook to delete a team
 */
export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: string) => ClientMembersAPI.deleteTeam(teamId),
    onSuccess: (_, teamId) => {
      // Remove team from cache
      queryClient.removeQueries({ queryKey: membersKeys.team(teamId) });
      // Invalidate lists
      void queryClient.invalidateQueries({ queryKey: membersKeys.myTeams() });
      void queryClient.invalidateQueries({
        queryKey: membersKeys.availableTeams(),
      });
    },
  });
}

/**
 * Hook to join a team
 */
export function useJoinTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: string) => ClientMembersAPI.joinTeam(teamId),
    onSuccess: () => {
      // Invalidate teams data to reflect membership changes
      void queryClient.invalidateQueries({ queryKey: membersKeys.myTeams() });
      void queryClient.invalidateQueries({
        queryKey: membersKeys.availableTeams(),
      });
    },
  });
}

/**
 * Hook to leave a team
 */
export function useLeaveTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: string) => ClientMembersAPI.leaveTeam(teamId),
    onSuccess: () => {
      // Invalidate teams data to reflect membership changes
      void queryClient.invalidateQueries({ queryKey: membersKeys.myTeams() });
      void queryClient.invalidateQueries({
        queryKey: membersKeys.availableTeams(),
      });
    },
  });
}
