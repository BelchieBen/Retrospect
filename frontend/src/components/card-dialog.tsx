import { Ghost, Logs, Text, Tv2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { TextareaAutosize } from "./ui/textarea-autosize";
import { type Prisma } from "@prisma/client";
import { useState } from "react";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function CardDialog({
  card,
}: Readonly<{
  card: Prisma.CardGetPayload<{
    include: { comments: { include: { createdBy: true } }; column: true };
  }>;
}>) {
  const [editDescription, setEditDescription] = useState(false);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Tv2 size={18} />
          {card.name}
        </DialogTitle>
        <DialogDescription>In {card.column?.name}</DialogDescription>
      </DialogHeader>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <Text size={20} />
          <p>Description</p>
        </div>
        <div className="w-full">
          {editDescription ? (
            <div className="flex flex-col gap-2">
              <TextareaAutosize rows={6} />
              <div className="flex gap-2">
                <Button className="w-fit">Save</Button>
                <Button
                  variant={"outline"}
                  className="w-fit bg-secondary"
                  onClick={() => setEditDescription(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant={"ghost"}
              className="h-24 w-full items-start justify-start rounded-md bg-secondary p-2"
              onClick={() => setEditDescription(true)}
            >
              <p>Add a detailed description...</p>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Logs size={20} />
          <p>Comments</p>
        </div>
        <div className="w-full">
          {card.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center gap-2 rounded-md bg-secondary p-2"
            >
              <Avatar>
                <AvatarImage
                  src={comment.createdBy.image ?? ""}
                  alt={comment.createdBy.name ?? ""}
                />
                <AvatarFallback>BB</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <p>{comment.createdBy.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {moment(comment.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a",
                    )}
                  </p>
                </div>
                <p>{comment.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  );
}
