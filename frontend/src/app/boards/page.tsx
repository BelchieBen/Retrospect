import { Separator } from "~/components/ui/separator";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import UserBoards from "../_components/user-boards";
import { CreateBoard } from "~/components/create-board";

export default async function BoardsPage() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/auth/signin");

  return (
    <main className="flex w-full justify-center">
      <div className="m-4 w-full max-w-7xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">Boards</h1>
          <Separator />
          <CreateBoard />
          <UserBoards />
        </div>
      </div>
    </main>
  );
}
