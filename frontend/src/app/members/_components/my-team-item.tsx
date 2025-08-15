import { Button } from "~/components/ui/button";
import { IUsers } from "~/icons";
import HelixPalette from "~/styles/palette";
import type { UserTeamMembership } from "../page";
import TeamAvatarGroup from "./team-avatar-group";

export default function MyTeamItem({
  teamMember,
  isEven,
}: {
  teamMember: UserTeamMembership;
  isEven: boolean;
}) {
  // Use the memberCount from the team data
  const memberCount = teamMember.team.memberCount;

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
            <TeamAvatarGroup teamMembers={[teamMember]} maxDisplay={4} />
            <span className="text-sm text-neutral60 dark:text-neutral40">
              {memberCount} member{memberCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" disabled>
        <IUsers color={HelixPalette.neutral60} size={16} />
        Member
      </Button>
    </div>
  );
}
