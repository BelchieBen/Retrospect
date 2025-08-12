import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "~/app/client-providers";
import { getServerAuthSession } from "~/server/auth";
import { ThemeProvider } from "~/app/theme-provider";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { SiteHeader } from "~/components/navigation/site-header";
import { AppSidebar } from "~/components/navigation/side-nav/app-sidebar";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Retrospect",
  description: "A retrospective tool for Ideagen",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Providers session={session}>
          <div className="flex h-screen flex-col [--header-height:calc(theme(spacing.14))]">
            <SidebarProvider className="flex min-h-0 flex-1 flex-col">
              <SiteHeader />
              <div className="flex min-h-0 flex-1 overflow-hidden">
                <AppSidebar />
                <SidebarInset className="min-h-0 flex-1 overflow-hidden">
                  {children}
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
          <Toaster />
        </Providers>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
