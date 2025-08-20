import { Button } from "~/components/ui/button";
import { IUsers, ICross } from "~/icons";
import HelixPalette from "~/styles/palette";
import type { UserTeamMembership } from "../page";
import TeamAvatarGroup from "./team-avatar-group";

export default function MyTeamItem({
  teamMember,
  isEven,
  onLeaveTeam,
  isLoading = false,
}: {
  teamMember: UserTeamMembership;
  isEven: boolean;
  onLeaveTeam?: (teamId: string) => void;
  isLoading?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between p-4 transition-colors hover:bg-neutral10 ${
        isEven ? "bg-neutral05 dark:bg-neutral10" : "bg-white dark:bg-neutral05"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="font-semibold text-neutral90 dark:text-white">
            {teamMember.team.name}
          </span>
          <div className="flex items-center gap-2">
            <TeamAvatarGroup teamMembers={teamMember.team.members} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          <IUsers color={HelixPalette.neutral60} size={16} />
          Member
        </Button>
        {onLeaveTeam && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLeaveTeam(teamMember.team.id)}
            disabled={isLoading}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
          >
            <ICross color="currentColor" size={16} />
            {isLoading ? "Leaving..." : "Leave"}
          </Button>
        )}
      </div>
    </div>
  );
}
