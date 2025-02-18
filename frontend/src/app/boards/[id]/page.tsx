import { redirect } from "next/navigation";
import BoardColumns from "~/app/_components/board-columns";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function BoardPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  const board = await api.board.getBoard({ id: params.id });
  if (!board) redirect("/404");

  return (
    <div className="m-4 h-full w-full">
      <h1 className="text-2xl">{board.name}</h1>
      <BoardColumns initialBoard={board} />
    </div>
  );
}
