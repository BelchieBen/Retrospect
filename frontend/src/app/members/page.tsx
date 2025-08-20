import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { IPlus, IUsers } from "~/icons";
import { MembersHeader } from "./_components/members-header";
import TeamsTab from "./_components/tabs/teams-tab";
import CreateTeamTab from "./_components/tabs/create-team";
import { ServerMembersAPI } from "~/lib/api/team-members/server-members-api";
import type {
  User,
  Team,
  TeamMember,
  UserTeamMembership,
  TeamWithMembers,
} from "~/lib/api/team-members/members-client";

export type { User, Team, TeamMember, UserTeamMembership, TeamWithMembers };

export default async function MembersPage() {
  // Fetch real data from the server
  const [users, myTeams, availableTeams] = await Promise.all([
    ServerMembersAPI.getUsers().catch(() => []),
    ServerMembersAPI.getMyTeams().catch(() => []),
    ServerMembersAPI.getAvailableTeams().catch(() => []),
  ]);

  return (
    <div className="flex-1 space-y-6 overflow-y-scroll p-6">
      <MembersHeader />

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-none border-b border-neutral20 bg-transparent p-0 dark:border-neutral60">
          <TabsTrigger
            value="teams"
            className="relative h-auto rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-neutral60 shadow-none transition-all hover:text-neutral90 data-[state=active]:border-teal60 data-[state=active]:bg-transparent data-[state=active]:text-neutral90 data-[state=active]:shadow-none dark:text-neutral40 dark:hover:text-white dark:data-[state=active]:text-white"
          >
            <span className="flex items-center gap-2">
              <IUsers color="currentColor" size={16} />
              Teams
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="relative h-auto rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 font-medium text-neutral60 shadow-none transition-all hover:text-neutral90 data-[state=active]:border-teal60 data-[state=active]:bg-transparent data-[state=active]:text-neutral90 data-[state=active]:shadow-none dark:text-neutral40 dark:hover:text-white dark:data-[state=active]:text-white"
          >
            <span className="flex items-center gap-2">
              <IPlus color="currentColor" size={16} />
              Create Team
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="mt-6 space-y-6">
          <TeamsTab
            initialMyTeams={myTeams}
            initialAvailableTeams={availableTeams}
          />
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <CreateTeamTab users={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
