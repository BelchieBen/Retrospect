import RootLayout from "~/components/root-layout";

export default function BoardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
