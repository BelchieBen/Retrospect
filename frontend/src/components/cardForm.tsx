"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {
  ClipboardEdit,
  Edit,
  Edit2,
  Edit3,
  EditIcon,
  FileEdit,
  LucideEdit3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { GifSelector } from "./giftSelector";
import { Comments } from "./comments";
import { useSession } from "next-auth/react";
import { Avatars } from "./avatar";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export function SimpleCard() {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [description, setDescription] = useState(
    "This is the card description. Click to edit.",
  );
  const [dialogTitle, setDialogTitle] = useState("Title");
  const [isOpen, setIsOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "Add Title",
    },
  });

  useEffect(() => {
    const savedImage = localStorage.getItem("backgroundImage");
    if (savedImage) {
      setBackgroundImage(savedImage);
    }
  }, []);

  const handleTitleSubmit = (data: z.infer<typeof FormSchema>) => {
    form.reset({ title: data.title });
  };

  const handleDescriptionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDescription = formData.get("description") as string;
    setDescription(newDescription);
    setIsOpen(false);
  };

  const handleCardClick = () => {
    setDialogTitle(form.getValues("title"));
    setIsOpen(true);
  };

  const handleGifSelect = (gifUrl: string) => {
    setBackgroundImage(gifUrl);
    localStorage.setItem("backgroundImage", gifUrl);
  };

  const handleNewComment = () => {
    setCommentsCount(commentsCount + 1);
  };
  return (
    <>
      <Card
        className="z-0 cursor-pointer"
        style={{ border: isHovered ? "2px solid white" : "none" }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative mb-4 flex flex-col">
          {isHovered && (
            <Button
              className="absolute right-0 top-0 m-2 rounded-full bg-black p-2"
              onClick={() => setIsEditEnabled(true)}
              aria-label="Edit title"
              variant="outline"
              title="Edit title"
            >
              <Edit2 size={16} />
            </Button>
          )}

          {backgroundImage && (
            <img
              id="background-image"
              src={backgroundImage}
              alt="Background"
              className="mt-2 max-h-64"
              style={{
                display: "block",
                margin: "0 auto",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </div>
        <CardHeader>
          <form
            onSubmit={form.handleSubmit(handleTitleSubmit)}
            className="z-10 flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              {...form.register("title")}
              autoFocus
              onBlur={() => form.handleSubmit(handleTitleSubmit)()}
              placeholder="Add Title"
              disabled={!isEditEnabled}
            />
          </form>
          <div className="flex items-center justify-end">
            <Avatars />
          </div>
          <div className="mt-2 flex items-center justify-start">
            {commentsCount > 0 && (
              <span title="comments">🗨️{commentsCount}</span>
            )}
          </div>
        </CardHeader>
      </Card>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <div className="mb-4 flex flex-col items-center">
            {backgroundImage && (
              <img
                id="background-image"
                src={backgroundImage}
                alt="Background"
                className="mt-2 max-h-64"
                style={{
                  display: "block",
                  margin: "0 auto",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
            <Button
              className="absolute right-2 top-2 rounded-full bg-transparent p-2 hover:bg-slate-600"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              style={{ fontSize: "2.5rem", color: "white" }}
            >
              <span>&times;</span>
            </Button>
            <GifSelector onSelect={handleGifSelect} />
          </div>
          <DialogHeader>
            <DialogTitle>
              <form
                onSubmit={form.handleSubmit(handleTitleSubmit)}
                className="z-10 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Input
                  {...form.register("title")}
                  autoFocus
                  onBlur={() => form.handleSubmit(handleTitleSubmit)()}
                  placeholder="Add Title"
                />
              </form>
            </DialogTitle>
            <div className="flex items-center justify-start">
              <Avatars />
            </div>
          </DialogHeader>
          <form onSubmit={handleDescriptionSubmit}>
            <div className="grid w-full grid-cols-1 items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label title="description">Description</Label>
                <TextareaAutosize
                  id="description"
                  name="description"
                  defaultValue={description}
                  minRows={2}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Save Description</Button>
            </DialogFooter>
          </form>
          <Comments onNewComment={handleNewComment} />
        </DialogContent>
      </Dialog>
    </>
  );
}
