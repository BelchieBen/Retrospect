import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import SignInButton from "~/app/_components/auth/signin-button";
import { getServerAuthSession } from "~/server/auth";

export default async function SigninPage() {
  const session = await getServerAuthSession();
  if (session) redirect("/");

  const providers = await getProviders();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {Object.values(providers ?? []).map((provider) => (
        <div key={provider.name}>
          <SignInButton provider={provider} />
        </div>
      ))}
    </div>
  );
}
