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
}: {
  teamMembers: MemberWithUser[];
}) {
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
      {teamMembers.map((member) => (
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
    </div>
  );
}
