import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { TeamMember, UserTeamMembership } from "../page";

// Helper type to handle both TeamMember and UserTeamMembership
type MemberWithUser =
  | TeamMember
  | UserTeamMembership
  | {
      id: string;
      user: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        role: "USER" | "ADMIN";
      };
    };

export default function TeamAvatarGroup({
  teamMembers,
  maxDisplay = 4,
}: {
  teamMembers: MemberWithUser[];
  maxDisplay?: number;
}) {
  const displayMembers = teamMembers.slice(0, maxDisplay);
  const remainingCount = teamMembers.length - maxDisplay;

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex -space-x-2">
      {displayMembers.map((member) => (
        <Avatar
          key={member.id}
          className="h-6 w-6 border-2 border-white ring-2 ring-gray-100"
        >
          <AvatarImage
            src={member.user.image ?? ""}
            alt={member.user.name ?? "User"}
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-medium text-white">
            {getInitials(member.user.name)}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="h-6 w-6 border-2 border-white bg-gray-100 font-medium text-gray-600 ring-2 ring-gray-100">
          <AvatarFallback className="bg-gray-200 text-xs font-semibold text-gray-700">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
