import { type Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWebSocket } from "~/lib/WebsocketContext";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useComments,
  useCreateComment,
} from "~/lib/api/comments/comments-queries";
import { toast } from "sonner";
import { Logs } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const CommentFormSchema = z.object({
  value: z.string().optional(),
});

export default function CardComments({
  card,
}: Readonly<{
  card: Prisma.CardGetPayload<{
    include: { comments: { include: { createdBy: true } }; column: true };
  }>;
}>) {
  const [addComment, setAddComment] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const { socket } = useWebSocket();

  const { data: comments } = useComments(card.id);
  const createCommentMutation = useCreateComment();

  useEffect(() => {
    if (socket) {
      socket.on("comment_updated", () => {
        // React Query will automatically refetch due to cache invalidation
        // handled by the createCommentMutation
      });

      return () => {
        socket.off("comment_updated");
      };
    }
  }, [socket]);

  const commentForm = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      value: "",
    },
  });

  function onCommentSubmit(data: z.infer<typeof CommentFormSchema>) {
    if (!data.value) {
      setAddComment(false);
      return;
    }
    if (!session?.user?.id) return;

    createCommentMutation.mutate(
      {
        cardId: card.id,
        value: data.value,
        userId: session.user.id,
      },
      {
        onSuccess: () => {
          toast.success("Comment added successfully");
          setAddComment(false);
          commentForm.reset();
        },
        onError: () => {
          toast.error("Failed to add comment");
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Logs size={20} />
        <p>Comments</p>
      </div>
      <div className="flex gap-2 p-2">
        <Avatar>
          <AvatarImage
            src={session?.user.image ?? ""}
            alt={session?.user.name ?? ""}
          />
          <AvatarFallback>BB</AvatarFallback>
        </Avatar>
        <div className="w-full">
          {addComment ? (
            <div className="flex flex-col gap-2">
              <Form {...commentForm}>
                <form
                  onSubmit={commentForm.handleSubmit(onCommentSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={commentForm.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Title</FormLabel>
                        <FormControl>
                          <Input {...field} ref={commentInputRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={createCommentMutation.isPending}
                    >
                      {createCommentMutation.isPending ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant={"outline"}
                      className="w-fit bg-secondary"
                      onClick={() => setAddComment(false)}
                      disabled={createCommentMutation.isPending}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <Button
              variant={"ghost"}
              className="h-full w-full items-center justify-start rounded-md bg-secondary p-2"
              onClick={() => {
                setAddComment(true);
                setTimeout(() => commentInputRef.current?.focus(), 0);
              }}
            >
              <p>Write a comment...</p>
            </Button>
          )}
        </div>
      </div>
      <div className="w-full">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start gap-2 rounded-md p-2"
          >
            <Avatar>
              <AvatarImage
                src={comment.createdBy.image ?? ""}
                alt={comment.createdBy.name ?? ""}
              />
              <AvatarFallback>BB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm">{comment.createdBy.name}</p>
                <p className="text-xs text-muted-foreground">
                  {moment(comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
              <div className="rounded-md bg-secondary p-2">
                <p>{comment.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
