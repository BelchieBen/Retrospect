import axios from "axios";
import { redirect } from "next/navigation";
import BoardColumns from "~/app/_components/board-columns";
import { backendUrl } from "~/constants/backendUrl";
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

  // Automatically add user to board if they're not already a member
  try {
    await axios.post(`${backendUrl}/boards/join`, {
      userId: session.user.id,
      boardId: id,
    });
  } catch (error) {
    console.error("Failed to add user to board:", error);
    // Continue rendering even if join fails - user might already have access
  }

  return (
    <div className="m-4 flex flex-col gap-4">
      <BoardColumns initialBoard={board} />
    </div>
  );
}
