import { redirect } from "next/navigation";
import BoardColumns from "~/app/_components/board-columns";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function BoardPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  const board = await api.board.getBoard({ id });
  if (!board) redirect("/404");

  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-2xl">{board.name}</h1>
      <BoardColumns initialBoard={board} />
    </div>
  );
}
