import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Retrospect",
  description: "A retrospective tool for Ideagen",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full font-sans" suppressHydrationWarning>
      <body className="h-full">{children}</body>
    </html>
  );
}
