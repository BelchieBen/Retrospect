import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { FeedbackCard } from "~/components/feedback-card";

export default async function AdminFeedbackPage() {
  const session = await getServerAuthSession();

  // Check if user is authenticated
  if (!session?.user) redirect("/auth/signin");

  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/"); // Redirect non-admin users
  }

  const [feedback, stats] = await Promise.all([
    api.feedback.getAllFeedback(),
    api.feedback.getFeedbackStats(),
  ]);

  return (
    <div className="flex-1 space-y-8 overflow-y-scroll p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Feedback Review
          </h1>
          <p className="mt-1 text-neutral60 dark:text-neutral40">
            Review and manage user feedback
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Admin Only
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Total Feedback
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-neutral60 dark:text-neutral40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.total}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              This Week
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-neutral60 dark:text-neutral40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.recent}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Bug Reports
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.byType.bug ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Feature Requests
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.byType.feature ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            All Feedback
          </h2>
          <p className="text-sm text-neutral60 dark:text-neutral40">
            {feedback.length} item{feedback.length !== 1 ? "s" : ""}
          </p>
        </div>

        {feedback.length > 0 ? (
          <div className="space-y-4">
            {feedback.map((item) => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="dark:from-neutral85 border-neutral20 bg-gradient-to-br from-neutral05 to-neutral10 p-8 text-center dark:border-neutral70 dark:to-neutral80">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral20 dark:bg-neutral60">
              <MessageSquare className="h-8 w-8 text-neutral60 dark:text-neutral40" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
              No feedback yet
            </h3>
            <p className="text-neutral60 dark:text-neutral40">
              When users submit feedback, it will appear here for review.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
