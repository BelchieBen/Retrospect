import RootLayout from "~/components/root-layout";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
