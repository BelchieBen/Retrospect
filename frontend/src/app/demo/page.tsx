import { getServerAuthSession } from "~/server/auth";
import { AddPostForm } from "../_components/post-form";
import Posts from "../_components/realtime-post";
import { redirect } from "next/navigation";

export default async function RealtimeDemoPage() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  return (
    <>
      <AddPostForm />
      <Posts />
    </>
  );
}
