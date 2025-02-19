import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return <>Homepage</>;
}
