"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { IIdeagenColor } from "./i-ideagen-color";
import { Button } from "~/components/ui/button";

export default function SignInButton({
  provider,
}: Readonly<{ provider: ClientSafeProvider }>) {
  return (
    <Button onClick={() => signIn(provider.id)}>
      <div className="flex items-center gap-2">
        <IIdeagenColor />
        <p
          className="text-xl font-medium"
          data-testid={`continue-with-${provider.id}-btn`}
        >
          Continue with Ideagen SSO
        </p>
      </div>
    </Button>
  );
}
