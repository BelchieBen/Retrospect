import { getServerAuthSession } from "~/server/auth";
import { SimpleCard } from "~/components/cardForm";
import { AddPostForm } from "../_components/post-form";
import Posts from "../_components/realtime-post";
import { redirect } from "next/navigation";

export default async function RealtimeDemoPage() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

export default function RealtimeDemoPage() {
  return (
    <>
      <AddPostForm />
      <Posts />
      <SimpleCard />
      <SimpleCard />
    </>
  );
}
