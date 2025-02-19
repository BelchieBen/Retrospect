import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./client-providers";
import { getServerAuthSession } from "~/server/auth";
import { ThemeProvider } from "./theme-provider";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { SiteHeader } from "~/components/site-header";
import { AppSidebar } from "~/components/app-sidebar";

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
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers session={session}>
              {session?.user ? (
                <div className="[--header-height:calc(theme(spacing.14))]">
                  <SidebarProvider className="flex flex-col">
                    <SiteHeader />
                    <div className="flex flex-1">
                      <AppSidebar />
                      <SidebarInset>{children}</SidebarInset>
                    </div>
                  </SidebarProvider>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {children}
                </div>
              )}
            </Providers>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
