import RootLayout from "~/components/root-layout";

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
