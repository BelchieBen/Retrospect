"use client";

import type { TeamWithMembers } from "../page";
import { Button } from "~/components/ui/button";
import { IPaperPlane, IPlus } from "~/icons";
import TeamAvatarGroup from "./team-avatar-group";

export default function AvailableTeamItem({
  team,
  onRequestJoin,
  isEven,
  isLoading = false,
}: {
  team: TeamWithMembers;
  onRequestJoin: (teamId: string) => void;
  isEven: boolean;
  isLoading?: boolean;
}) {
  const teamMembers = team.members;
  const memberCount = team.memberCount;

  return (
    <div
      className={`flex items-center justify-between p-4 transition-colors hover:bg-neutral10 ${
        isEven ? "bg-neutral05 dark:bg-neutral10" : "bg-white dark:bg-neutral05"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="font-semibold text-neutral90 dark:text-white">
            {team.name}
          </span>
          <div className="flex items-center gap-2">
            <TeamAvatarGroup teamMembers={teamMembers} />
            <span className="text-sm text-neutral60 dark:text-neutral40">
              {memberCount} member{memberCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onRequestJoin(team.id)}
        disabled={isLoading}
        className="border-teal60 text-teal60 hover:bg-teal60 hover:text-white disabled:opacity-50"
      >
        <IPaperPlane color="currentColor" size={16} />
        {isLoading ? "Joining..." : "Join Team"}
      </Button>
    </div>
  );
}
