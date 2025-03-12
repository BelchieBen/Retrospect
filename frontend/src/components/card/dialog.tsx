import { Text, Tv2, Videotape, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { TextareaAutosize } from "~/components/ui/textarea-autosize";
import { type Prisma } from "@prisma/client";
import React, { type ChangeEvent, useCallback, useRef, useState } from "react";
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
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: card.description ?? "",
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

  function fetchGifsGrid(offset: number) {
    return giphy.search(giphySearchTerm || "trending", { offset, limit: 10 });
  }

  async function updateCardGif(gifUrl: string) {
    const response = await axios.put(`${backendUrl}/cards/${card.id}`, {
      gifUrl,
    });
    if (response.status === 200) {
      toast.success("GIF updated successfully");
    } else {
      toast.error("Failed to upload GIF");
    }
  }

  const debouncedSaveCardTitle = useCallback(
    debounce((name: string) => saveCardName(name), 500),
    [card.id],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
    void debouncedSaveCardTitle(e.target.value);
  };

  const saveCardName = async (name: string) => {
    setCardName(name);
    await axios.put(`${backendUrl}/cards/${card.id}`, {
      name,
    });
  };

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
              <input
                value={cardName}
                type="text"
                spellCheck
                className="w-full bg-transparent p-1 focus-visible:border-b-2 focus-visible:border-solid focus-visible:border-primary focus-visible:outline-none"
                onChange={handleChange}
              />
            </div>
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
    </DialogContent>
  );
}
