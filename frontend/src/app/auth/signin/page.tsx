import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import SignInButton from "~/app/_components/auth/signin-button";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function SigninPage() {
  const session = await getServerAuthSession();
  if (session) redirect("/");

  const providers = await getProviders();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login_background.jpg"
          alt="Login Background"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(75, 85, 99, 0.4), rgba(107, 114, 128, 0.3))",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-md">
        {/* Logo and Branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
            <Image
              src="/Ideagen_Cubes.png"
              alt="Ideagen Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
            Welcome to Retrospect
          </h1>
          <p className="text-neutral90 dark:text-neutral20">
            Your collaborative retrospective workspace
          </p>
        </div>

        {/* Login Card */}
        <Card className="dark:bg-neutral85 border-neutral20 bg-neutral05 shadow-xl backdrop-blur-sm dark:border-neutral70">
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-xl font-semibold text-black dark:text-white">
              Sign in to continue
            </CardTitle>
            <CardDescription className="text-neutral60 dark:text-neutral40">
              Use your Ideagen credentials to access your boards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.values(providers ?? []).map((provider) => (
              <SignInButton key={provider.name} provider={provider} />
            ))}

            {/* Additional Info */}
            <div className="border-t border-neutral20 pt-4 dark:border-neutral70">
              <p className="text-center text-xs text-neutral50 dark:text-neutral50">
                By signing in, you agree to our terms of service and privacy
                policy
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral90 dark:text-neutral20">
            Need help? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  );
}
