import RootLayout from "~/components/root-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
