import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Plus, Users, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CreateBoard } from "~/components/create-board";
import { Badge } from "~/components/ui/badge";

export default async function BoardsPage() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  const boards = await api.board.getBoards();
  const dashboardStats = await api.board.getDashboardStats();

  const userBoards = boards?.BoardMembers ?? [];

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Your Boards
          </h1>
          <p className="mt-1 text-neutral60 dark:text-neutral40">
            Manage and organize your collaborative workspaces
          </p>
        </div>
        <CreateBoard />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Total Boards
            </CardTitle>
            <Users className="h-4 w-4 text-neutral60 dark:text-neutral40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {dashboardStats.totalBoards}
            </div>
            <p className="text-xs text-neutral60 dark:text-neutral40">
              Active collaboration spaces
            </p>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Team Members
            </CardTitle>
            <Users className="h-4 w-4 text-neutral60 dark:text-neutral40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {dashboardStats.teamMembers}
            </div>
            <p className="text-xs text-neutral60 dark:text-neutral40">
              Collaborating with you
            </p>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Recent Activity
            </CardTitle>
            <Calendar className="h-4 w-4 text-neutral60 dark:text-neutral40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {dashboardStats.recentActivity}
            </div>
            <p className="text-xs text-neutral60 dark:text-neutral40">
              Cards this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Boards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            All Boards
          </h2>
          <p className="text-sm text-neutral60 dark:text-neutral40">
            {userBoards.length} board{userBoards.length !== 1 ? "s" : ""}
          </p>
        </div>

        {userBoards.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userBoards.map((boardMember) => (
              <Link
                key={boardMember.board.id}
                href={`/boards/${boardMember.board.id}`}
              >
                <Card className="dark:to-neutral85 group h-32 cursor-pointer border-neutral20 bg-gradient-to-br from-white to-neutral05 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-neutral70 dark:from-neutral90">
                  <CardContent className="flex h-full flex-col justify-between p-4">
                    <div className="flex-1">
                      <h3 className="line-clamp-2 font-medium text-black dark:text-white">
                        {boardMember.board.name}
                      </h3>
                      <p className="mt-2 text-xs text-neutral60 dark:text-neutral40">
                        Created{" "}
                        {boardMember.board.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        Board
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-neutral50 transition-transform group-hover:translate-x-1 dark:text-neutral50" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Create New Board Card */}
            <CreateBoard>
              <Card className="group h-32 cursor-pointer border-2 border-dashed border-neutral30 bg-neutral05 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-neutral60 dark:bg-neutral20">
                <CardContent className="flex h-full flex-col items-center justify-center p-4">
                  <div className="rounded-full bg-teal60 p-2 transition-transform group-hover:scale-110">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <p className="mt-2 text-center text-sm font-medium text-neutral70 dark:text-neutral30">
                    Create New Board
                  </p>
                  <p className="text-center text-xs text-neutral50 dark:text-neutral50">
                    Start collaborating
                  </p>
                </CardContent>
              </Card>
            </CreateBoard>
          </div>
        ) : (
          /* Empty State */
          <Card className="dark:from-neutral85 border-neutral20 bg-gradient-to-br from-neutral05 to-neutral10 p-8 text-center dark:border-neutral70 dark:to-neutral80">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal60">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
              No boards yet
            </h3>
            <p className="mb-6 text-neutral60 dark:text-neutral40">
              Create your first board to start collaborating with your team
            </p>
            <CreateBoard />
          </Card>
        )}
      </div>
    </div>
  );
}
