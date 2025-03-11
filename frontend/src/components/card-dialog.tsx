import { Logs, Text, Tv2, Videotape } from "lucide-react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { TextareaAutosize } from "./ui/textarea-autosize";
import { type Prisma } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosResponse } from "axios";
import { z } from "zod";
import { backendUrl } from "~/constants/backendUrl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "sonner";
import { useQuery } from "react-query";
import { useWebSocket } from "~/lib/WebsocketContext";
import { Grid } from "@giphy/react-components";
import giphy from "~/lib/giphy";
import Image from "next/image";

const FormSchema = z.object({
  description: z.string().optional(),
});

const CommentFormSchema = z.object({
  value: z.string().optional(),
});

export default function CardDialog({
  card,
}: Readonly<{
  card: Prisma.CardGetPayload<{
    include: { comments: { include: { createdBy: true } }; column: true };
  }>;
}>) {
  const [editDescription, setEditDescription] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [giphySearchTerm, setGiphySearchTerm] = useState("");
  const [gifUrl, setGifUrl] = useState(card.gifUrl ?? "");
  const commentInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: card.description ?? "",
    },
  });

  const commentForm = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      value: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.description) setEditDescription(false);
    const response = await axios.put(`${backendUrl}/cards/${card.id}`, data);
    if (response.status === 200) {
      toast.success("Card updated successfully");
      setEditDescription(false);
    } else {
      toast.error("Failed to update card");
    }
  }

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

  function fetchGifsGrid(offset: number) {
    return giphy.search(giphySearchTerm || "trending", { offset, limit: 10 });
  }

  async function saveGif(gifUrl: string) {
    const response = await axios.put(`${backendUrl}/cards/${card.id}`, {
      gifUrl,
    });
    if (response.status === 200) {
      toast.success("GIF updated successfully");
    } else {
      toast.error("Failed to update GIF");
    }
  }

  return (
    <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto overflow-x-clip p-0 sm:max-w-[625px]">
      {gifUrl && (
        <div className="relative h-52 w-full">
          <Image fill src={gifUrl} alt="GIF" />
        </div>
      )}
      <div className="flex flex-col gap-4 p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tv2 size={18} />
            {card.name}
          </DialogTitle>
          <DialogDescription>In {card.column?.name}</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Text size={20} />
              <p>Description</p>
            </div>
            <div className="w-full">
              {editDescription ? (
                <div className="flex flex-col gap-2">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Post Title</FormLabel>
                            <FormControl>
                              <TextareaAutosize
                                rows={6}
                                {...field}
                                ref={descriptionInputRef}
                              />
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
                          onClick={() => setEditDescription(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditDescription(true);
                    setTimeout(() => {
                      if (descriptionInputRef.current) {
                        const length = descriptionInputRef.current.value.length;
                        descriptionInputRef.current.focus();
                        descriptionInputRef.current.setSelectionRange(
                          length,
                          length,
                        );
                      }
                    }, 0);
                  }}
                  className="flex min-h-24 w-full items-start justify-start rounded-md bg-secondary p-2 text-left"
                >
                  <div
                    className="h-full w-full text-sm"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {card.description ?? "Add a detailed description"}
                  </div>
                </button>
              )}
            </div>
          </div>
          {/* GIF's */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Videotape size={20} />
              <p>GIF</p>
            </div>
            <Input
              placeholder="Search for GIFs"
              value={giphySearchTerm}
              onChange={(e) => {
                setGiphySearchTerm(e.target.value);
                void fetchGifsGrid(0);
              }}
            />
            <div>
              {gifUrl && (
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setGifUrl("");
                  }}
                >
                  Remove GIF
                </Button>
              )}
            </div>
            <div className="h-60 w-full overflow-x-clip overflow-y-scroll">
              <Grid
                columns={3}
                fetchGifs={fetchGifsGrid}
                gutter={6}
                key={giphySearchTerm}
                noResultsMessage={"No Results"}
                width={550}
                onGifClick={(gif, e) => {
                  e.preventDefault();
                  setGifUrl(gif.images.fixed_height.url);
                  void saveGif(gif.images.fixed_height.url);
                }}
              />
            </div>
          </div>
          {/* Comments */}
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
                        {moment(comment.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a",
                        )}
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
        </div>
      </div>
    </DialogContent>
  );
}
