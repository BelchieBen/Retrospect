import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FeedbackForm } from "~/components/feedback-form";

export default async function FeedbackPage() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  return (
    <div className="flex-1 space-y-8 overflow-y-scroll p-8 pt-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Share Your Feedback
        </h1>
        <p className="mt-1 text-neutral60 dark:text-neutral40">
          Help us improve your collaboration experience
        </p>
      </div>

      {/* Feedback Form */}
      <div>
        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader>
            <CardTitle className="text-xl text-black dark:text-white">
              Tell us what you think
            </CardTitle>
            <p className="text-neutral60 dark:text-neutral40">
              Your feedback helps us build better tools for team collaboration.
              Share your thoughts, suggestions, or report any issues you&apos;ve
              encountered.
            </p>
          </CardHeader>
          <CardContent>
            <FeedbackForm />
          </CardContent>
        </Card>
      </div>

      {/* Info Cards */}
      {/* <div className="mx-auto max-w-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="dark:to-neutral85 border-neutral20 bg-gradient-to-br from-white to-neutral05 dark:border-neutral70 dark:from-neutral90">
            <CardContent className="p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal60">
                <IPaperPlane color="white" />
              </div>
              <h3 className="font-semibold text-black dark:text-white">
                Quick Response
              </h3>
              <p className="mt-2 text-sm text-neutral60 dark:text-neutral40">
                We typically respond to feedback within 24-48 hours during
                business days.
              </p>
            </CardContent>
          </Card>

          <Card className="dark:to-neutral85 border-neutral20 bg-gradient-to-br from-white to-neutral05 dark:border-neutral70 dark:from-neutral90">
            <CardContent className="p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal60">
                <IPaperPlane color="white" />
              </div>
              <h3 className="font-semibold text-black dark:text-white">
                Anonymous Option
              </h3>
              <p className="mt-2 text-sm text-neutral60 dark:text-neutral40">
                Choose to submit feedback anonymously if you prefer not to be
                contacted.
              </p>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  );
}
