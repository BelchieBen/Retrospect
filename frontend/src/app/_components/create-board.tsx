"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateBoard } from "~/lib/api/boards/board-queries";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Board title is required",
  }),
});

interface CreateBoardProps {
  readonly children?: React.ReactNode;
}

export function CreateBoard({ children }: CreateBoardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const createBoard = useCreateBoard();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }

    createBoard.mutate(
      {
        title: data.title,
        ownerId: session.user.id,
      },
      {
        onSuccess: (newBoard) => {
          form.reset();
          setOpen(false);
          router.push(`/boards/${newBoard.id}`);
        },
        onError: (error) => {
          console.error("Failed to create board:", error);
          // You might want to show a toast notification here
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="default"
            className="rounded-md border-none bg-teal80 text-white"
          >
            Create Board
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 sm:max-w-[500px]">
        {/* Header */}
        <DialogHeader className="rounded-t-lg bg-neutral05 px-6 py-4 dark:bg-neutral80">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-neutral100 dark:text-white">
              Create New Board
            </DialogTitle>
          </div>
          <p className="mt-1 text-sm text-neutral90 dark:text-neutral40">
            Start collaborating with your team on a new board
          </p>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral100 dark:text-neutral30">
                      Board Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter board title..."
                        className="h-10 border-neutral70 bg-white dark:border-neutral60 dark:bg-neutral90"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-neutral30 text-neutral70 dark:border-neutral60 dark:text-neutral30"
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={createBoard.isPending}
            className="bg-teal80 text-white hover:bg-teal70 disabled:opacity-50"
          >
            {createBoard.isPending ? "Creating..." : "Create Board"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
