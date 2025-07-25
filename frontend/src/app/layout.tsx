import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./client-providers";
import { getServerAuthSession } from "~/server/auth";
import { ThemeProvider } from "./theme-provider";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { SiteHeader } from "~/components/site-header";
import { AppSidebar } from "~/components/app-sidebar";
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
    <html lang="en" className="h-full font-sans" suppressHydrationWarning>
      <body className="h-full">
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers session={session}>
              {session?.user ? (
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
              ) : (
                <div className="justify-cente flex items-center">
                  {children}
                </div>
              )}
              <Toaster />
            </Providers>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
