import { redirect } from "next/navigation";
import BoardColumns from "./_components/board-columns";
import { getServerAuthSession } from "~/server/auth";
import { ServerBoardAPI } from "~/lib/api/boards/server-board-api";

export default async function BoardPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  const board = await ServerBoardAPI.getBoard(id);
  console.log(board);
  if (!board) redirect("/404");

  // Automatically add user to board if they're not already a member
  try {
    await ServerBoardAPI.joinBoard({
      userId: session.user.id,
      boardId: id,
    });
  } catch (error) {
    console.error("Failed to add user to board:", error);
    // Continue rendering even if join fails - user might already have access
  }

  return (
    <div className="flex h-full flex-col overflow-hidden p-4">
      <BoardColumns initialBoard={board} />
    </div>
  );
}
