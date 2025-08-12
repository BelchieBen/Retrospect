import { type Prisma } from "@prisma/client";
import axios, { type AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { z } from "zod";
import { useWebSocket } from "~/lib/WebsocketContext";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import moment from "moment";
import { backendUrl } from "~/constants/backendUrl";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const { data: comments, refetch } = useQuery(
    ["comments", card.id],
    async () => {
      const response: AxiosResponse<
        Prisma.CommentGetPayload<{ include: { createdBy: true } }>[]
      > = await axios.get(`${backendUrl}/comments/${card.id}`);

      return response.data;
    },
  );

  useEffect(() => {
    if (socket) {
      socket.on("comment_updated", async () => {
        await refetch();
      });
    }
  }, [socket]);

  const commentForm = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      value: "",
    },
  });

  async function onCommentSubmit(data: z.infer<typeof CommentFormSchema>) {
    if (!data.value) setAddComment(false);
    const response = await axios.post(`${backendUrl}/comments`, {
      ...data,
      cardId: card.id,
      userId: session?.user.id,
    });
    if (response.status === 200) {
      toast.success("Card updated successfully");
      setAddComment(false);
      commentForm.reset();
    } else {
      toast.error("Failed to update card");
    }
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
                    <Button type="submit">Save</Button>
                    <Button
                      variant={"outline"}
                      className="w-fit bg-secondary"
                      onClick={() => setAddComment(false)}
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
