import RootLayout from "~/components/root-layout";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
