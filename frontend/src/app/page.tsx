import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { ArrowRightCircle, Clock, Plus, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CreateBoard } from "~/components/create-board";
import { TemplateCard } from "~/components/template-card";
import { templates } from "~/constants/board-templates";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  const recentBoards = await api.board.getRecentBoards();
  const dashboardStats = await api.board.getDashboardStats();

  return (
    <div className="flex-1 space-y-8 overflow-y-scroll p-8 pt-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Welcome back, {session.user.name?.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-neutral60 dark:text-neutral40">
            Ready to collaborate? Let&apos;s get your team organized.
          </p>
        </div>
        <CreateBoard />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 bg-gradient-to-r from-teal70 to-teal60 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Boards</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalBoards}
            </div>
            <p className="text-xs text-teal10">Active collaboration spaces</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-blue60 to-blue50 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <Zap className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.recentActivity}
            </div>
            <p className="text-xs text-blue10">Cards updated this week</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green60 to-green50 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Star className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.teamMembers}
            </div>
            <p className="text-xs text-green10">Collaborating with you</p>
          </CardContent>
        </Card>
      </div>

      {/* Recently Viewed */}
      {recentBoards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-neutral60 dark:text-neutral40" />
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Recently Viewed
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recentBoards.map((boardMember) => (
              <Link
                key={boardMember.board.id}
                href={`/boards/${boardMember.board.id}`}
              >
                <Card className="h-24 cursor-pointer border-teal20 bg-gradient-to-br from-teal05 to-teal10 transition-all hover:scale-105 hover:shadow-md dark:border-teal60 dark:from-teal20 dark:to-teal30">
                  <CardContent className="flex h-full flex-col justify-center p-4">
                    <h3 className="truncate font-medium text-black dark:text-white">
                      {boardMember.board.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral60 dark:text-neutral40">
                      Board • {boardMember.board.createdAt.toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <Link href="/boards">
              <Card className="h-24 cursor-pointer border-2 border-dashed border-neutral30 bg-neutral05 transition-all hover:scale-105 hover:shadow-md dark:border-neutral60 dark:bg-neutral20">
                <CardContent className="flex h-full flex-col items-center justify-center p-4">
                  <ArrowRightCircle className="mb-1 h-6 w-6 text-neutral60 dark:text-neutral40" />
                  <p className="text-center text-xs text-neutral60 dark:text-neutral40">
                    View all boards
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {/* Template Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-black dark:text-white">
              🚀 Get started with templates
            </h2>
            <p className="mt-1 text-sm text-neutral60 dark:text-neutral40">
              Jump-start your collaboration with these proven templates
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/templates">Browse all templates</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => {
            return <TemplateCard key={template.id} template={template} />;
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-teal20 bg-gradient-to-r from-teal05 to-blue05 p-6 dark:border-teal60 dark:from-teal20 dark:to-blue20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
              Ready to collaborate?
            </h3>
            <p className="text-sm text-neutral60 dark:text-neutral40">
              Create your first board or invite team members to get started
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/boards">
                <Users className="mr-2 h-4 w-4" />
                Invite Team
              </Link>
            </Button>
            <CreateBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
