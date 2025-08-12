import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { CreateBoard } from "~/app/_components/create-board";
import { templates } from "~/constants/board-templates";
import {
  IInfo,
  ICalendar,
  IDashboard,
  IEditText,
  IApproved,
  IHome,
  IArrowRight,
  IConjoinedLine,
  IFileText,
  IPlus,
  ITick2,
  IUsers,
} from "~/icons";
import HelixPalette from "~/styles/palette";
import { TemplateCard } from "~/app/_components/template-card";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  const recentBoards = await api.board.getRecentBoards();
  const dashboardStats = await api.board.getDashboardStats();

  // Get current date and time info for header
  const now = new Date();
  const timeOfDay =
    now.getHours() < 12
      ? "morning"
      : now.getHours() < 17
        ? "afternoon"
        : "evening";
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 space-y-6 overflow-y-scroll p-6">
      {/* Header Section */}
      <div
        className="relative flex items-center justify-between overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat p-6"
        style={{
          backgroundImage: "url('/header_img.svg')",
        }}
      >
        <div className="relative z-10 flex items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-neutral80">
                {dayName}, {monthDay},
              </div>
              <div className="text-sm text-neutral80">
                {now.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-neutral90">
              Good {timeOfDay}, {session.user.name?.split(" ")[0]}!
            </h1>
          </div>
        </div>
        <Button
          className="relative z-10 bg-teal60 text-white shadow-lg hover:bg-teal70"
          asChild
        >
          <Link href="/boards">
            <IPlus color={HelixPalette.white} />
            Ready to collaborate
          </Link>
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 bg-gradient-to-br from-pink50 to-pink60 text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <IDashboard color="white" size={32} />
              </div>
              <div>
                <div className="text-sm opacity-90">Total Boards</div>
                <div className="text-3xl font-bold">
                  {dashboardStats.totalBoards}
                </div>
                <div className="text-xs opacity-90">
                  Active collaboration spaces
                </div>
              </div>
            </div>
            <div className="text-6xl font-bold opacity-20">
              {dashboardStats.totalBoards}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue50 to-blue60 text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <IInfo color="white" size={32} />
              </div>
              <div>
                <div className="text-sm opacity-90">Recent Activity</div>
                <div className="text-3xl font-bold">
                  {dashboardStats.recentActivity}
                </div>
                <div className="text-xs opacity-90">
                  Cards updated this week
                </div>
              </div>
            </div>
            <div className="text-6xl font-bold opacity-20">
              {dashboardStats.recentActivity}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-teal60 to-teal70 text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <ICalendar color="white" size={32} />
              </div>
              <div>
                <div className="text-sm opacity-90">Team Members</div>
                <div className="text-3xl font-bold">
                  {dashboardStats.teamMembers}
                </div>
                <div className="text-xs opacity-90">Collaborating with you</div>
              </div>
            </div>
            <div className="text-6xl font-bold opacity-20">
              {dashboardStats.teamMembers}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* My Boards & Templates Section */}
        <div className="space-y-6 lg:col-span-2">
          {/* My Boards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IDashboard color={HelixPalette.neutral100} size={20} />
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  My boards
                </h2>
              </div>
              <Button variant="outline" asChild>
                <Link className="text-sm text-neutral90" href="/boards">
                  <IArrowRight color={HelixPalette.neutral90} />
                  See all boards
                </Link>
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {recentBoards.length > 0 ? (
                recentBoards.slice(0, 4).map((boardMember) => (
                  <Link
                    key={boardMember.board.id}
                    href={`/boards/${boardMember.board.id}`}
                  >
                    <Card className="cursor-pointer border-neutral10 transition-all hover:shadow-md dark:border-teal60">
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <IDashboard
                            color={HelixPalette.neutral90}
                            size={24}
                          />
                          <div>
                            <h3 className="font-medium text-neutral90 dark:text-white">
                              {boardMember.board.name}
                            </h3>
                            <p className="text-xs text-neutral70 dark:text-neutral40">
                              Board • Updated{" "}
                              {boardMember.board.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button className="relative z-10 bg-teal80 text-white shadow-lg hover:bg-teal70">
                          Open
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card className="border-2 border-dashed border-neutral30 bg-neutral05 dark:border-neutral60 dark:bg-neutral20">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <IDashboard color={HelixPalette.neutral90} size={48} />
                    <h3 className="mt-4 font-medium text-black dark:text-white">
                      No boards yet
                    </h3>
                    <p className="mt-1 text-sm text-neutral60 dark:text-neutral40">
                      Create your first board to get started
                    </p>
                    <div className="mt-4">
                      <CreateBoard />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Templates Gallery - Horizontal */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IFileText color={HelixPalette.neutral100} size={20} />
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Templates
                </h2>
              </div>
              <Button variant="outline" asChild>
                <Link className="text-sm text-neutral90" href="/templates">
                  <IPlus color={HelixPalette.neutral90} />
                  Browse all templates
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.slice(0, 3).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </div>

        {/* My Quick Actions - Right Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IHome color={HelixPalette.neutral90} size={20} />
              <h2 className="text-lg font-semibold text-black dark:text-white">
                My quick actions
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            <CreateBoard>
              <Card className="cursor-pointer border-neutral20 transition-all hover:shadow-md dark:border-neutral60">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-lg bg-green10 p-3 dark:bg-green20">
                    <IEditText color={HelixPalette.green70} size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-black dark:text-white">
                      Create
                    </h3>
                    <p className="text-xs text-neutral60 dark:text-neutral40">
                      Start a new board
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CreateBoard>

            <Card className="cursor-pointer border-neutral20 transition-all hover:shadow-md dark:border-neutral60">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-pink10 p-3 dark:bg-pink20">
                  <ITick2 size={24} color={HelixPalette.pink70} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white">
                    Review
                  </h3>
                  <p className="text-xs text-neutral60 dark:text-neutral40">
                    Review pending items
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer border-neutral20 transition-all hover:shadow-md dark:border-neutral60">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-blue10 p-3 dark:bg-blue20">
                  <IConjoinedLine size={24} color={HelixPalette.blue70} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white">
                    Workflow
                  </h3>
                  <p className="text-xs text-neutral60 dark:text-neutral40">
                    Manage processes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer border-neutral20 transition-all hover:shadow-md dark:border-neutral60">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-yellow10 p-3 dark:bg-yellow20">
                  <IApproved color={HelixPalette.yellow70} size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white">
                    Approval
                  </h3>
                  <p className="text-xs text-neutral60 dark:text-neutral40">
                    Approve requests
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <Card className="border-teal20 bg-gradient-to-r from-teal05 to-blue05 dark:border-teal60 dark:from-teal20 dark:to-blue20">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Ready to collaborate?
            </h3>
            <p className="mt-1 text-sm text-neutral60 dark:text-neutral40">
              Create your first board or invite team members to get started
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link className="text-neutral100" href="/boards">
                <IUsers color={HelixPalette.neutral100} />
                View Boards
              </Link>
            </Button>
            <CreateBoard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
