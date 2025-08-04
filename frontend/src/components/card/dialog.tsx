import {
  Text,
  Tv2,
  Videotape,
  Trash2,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { TextareaAutosize } from "~/components/ui/textarea-autosize";
import { type Prisma } from "@prisma/client";
import React, {
  type ChangeEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { backendUrl } from "~/constants/backendUrl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "sonner";
import { Grid } from "@giphy/react-components";
import giphy from "~/lib/giphy";
import Image from "next/image";
import CardComments from "./comments";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";

const FormSchema = z.object({
  description: z.string().optional(),
});

export default function CardDialog({
  card,
}: Readonly<{
  card: Prisma.CardGetPayload<{
    include: { comments: { include: { createdBy: true } }; column: true };
  }>;
}>) {
  const [editDescription, setEditDescription] = useState(false);
  const [cardName, setCardName] = useState(card.name ?? "");
  const [giphySearchTerm, setGiphySearchTerm] = useState("");
  const [gifUrl, setGifUrl] = useState(card.gifUrl ?? "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const cardNameRef = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();

  const deleteCardMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${backendUrl}/cards/${card.id}`, {
        data: {
          userId: session?.user.id,
        },
      });
    },
    onSuccess: () => {
      setShowDeleteDialog(false);
      // Close the main dialog by triggering a click on the close button or parent handler
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    },
    onError: (error) => {
      console.error("Failed to delete card:", error);
    },
  });

  const archiveCardMutation = useMutation({
    mutationFn: async (archived: boolean) => {
      await axios.patch(`${backendUrl}/cards/${card.id}/archive`, {
        archived,
        userId: session?.user.id,
      });
    },
    onSuccess: () => {
      toast.success(
        card.archived
          ? "Card unarchived successfully"
          : "Card archived successfully",
      );
      // Close the main dialog
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    },
    onError: (error) => {
      console.error("Failed to archive/unarchive card:", error);
      toast.error("Failed to archive/unarchive card");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: card.description ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.description) setEditDescription(false);
    const response = await axios.put(`${backendUrl}/cards/${card.id}`, {
      ...data,
      userId: session?.user.id,
    });
    if (response.status === 200) {
      toast.success("Card updated successfully");
      setEditDescription(false);
    } else {
      toast.error("Failed to update card");
    }
  }

  function fetchGifsGrid(offset: number) {
    return giphy.search(giphySearchTerm || "trending", { offset, limit: 10 });
  }

  async function updateCardGif(gifUrl: string) {
    const response = await axios.put(`${backendUrl}/cards/${card.id}`, {
      gifUrl,
      userId: session?.user.id,
    });
    if (response.status === 200) {
      toast.success("GIF updated successfully");
    } else {
      toast.error("Failed to upload GIF");
    }
  }

  const saveCardName = useCallback(
    async (name: string) => {
      setCardName(name);
      await axios.put(`${backendUrl}/cards/${card.id}`, {
        name,
        userId: session?.user.id,
      });
    },
    [card.id, session],
  );

  const debouncedSaveCardTitle = useMemo(
    () => debounce(saveCardName, 500),
    [saveCardName],
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCardName(e.target.value);
    resizeTextArea(e.target);
    void debouncedSaveCardTitle(e.target.value);
  };

  const deleteCard = () => {
    deleteCardMutation.mutate();
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const resizeTextArea = (textArea: HTMLTextAreaElement) => {
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    if (cardNameRef.current) {
      resizeTextArea(cardNameRef.current);
    }
  }, [cardNameRef]);

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
            <div
              className={`flex w-full ${card.gifUrl ? "justify-between" : "justify-normal gap-2"} items-center`}
            >
              <textarea
                ref={cardNameRef}
                spellCheck
                rows={1}
                value={cardName}
                className="w-full resize-none overflow-hidden border-b-2 border-teal80 bg-transparent p-1 focus-visible:outline-none"
                onChange={handleChange}
              />
            </div>
          </DialogTitle>
          <DialogDescription>In {card.column?.name}</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4">
          {/* Actions section */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => archiveCardMutation.mutate(!card.archived)}
              disabled={archiveCardMutation.isLoading}
              className={
                card.archived
                  ? "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  : "text-orange-600 hover:bg-orange-50 hover:text-orange-700"
              }
            >
              {card.archived ? (
                <>
                  <ArchiveRestore className="mr-2 h-4 w-4" />
                  Restore Card
                </>
              ) : (
                <>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Card
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteClick}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Card
            </Button>
          </div>

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
                    void updateCardGif("");
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
                  void updateCardGif(gif.images.fixed_height.url);
                }}
              />
            </div>
          </div>
          <CardComments card={card} />
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Card</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{cardName || "this card"}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleteCardMutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteCard}
              disabled={deleteCardMutation.isLoading}
            >
              {deleteCardMutation.isLoading ? "Deleting..." : "Delete Card"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContent>
  );
}
