"use client";

import { useState, useEffect, type ChangeEvent, useRef } from "react";
import { type Prisma } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import CardDialog from "./card-dialog";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSession } from "next-auth/react";
import { IBox, ICross, IPencil, ITick } from "~/icons";
import { useUpdateCard } from "~/lib/api/cards/cards-queries";

export function Card({
  card,
}: Readonly<{
  card: Prisma.CardGetPayload<{
    include: {
      comments: { include: { createdBy: true } };
      createdBy: true;
      column: true;
    };
  }>;
}>) {
  const [cardName, setCardName] = useState(card.name ?? "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const cardNameRef = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const updateCardMutation = useUpdateCard();

  useEffect(() => {
    setCardName(card.name ?? "");
  }, [card]);

  useEffect(() => {
    if (cardNameRef.current) {
      cardNameRef.current.style.height = "auto";
      cardNameRef.current.style.height = `${cardNameRef.current.scrollHeight}px`;
    }
  }, [cardName, isEditingTitle]);

  const saveCardName = (name: string) => {
    setCardName(name);
    if (!session?.user?.id) return;

    updateCardMutation.mutate({
      cardId: card.id,
      data: {
        name,
        userId: session.user.id,
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCardName(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    void saveCardName(e.target.value);
  };

  if (card.gifUrl)
    return (
      <Dialog>
        <div
          className={`flex flex-col rounded-lg border-2 border-neutral10 bg-white ${card.archived ? "opacity-60" : ""}`}
        >
          {!isEditingTitle ? (
            <DialogTrigger asChild>
              <div className="flex flex-col gap-4 p-2">
                <div className="relative h-32 w-full">
                  <Image src={card.gifUrl} fill alt={"GIF"} />
                  {card.archived && (
                    <div className="absolute left-0 top-0 m-2 rounded-full bg-gray-600 p-1 shadow-md">
                      <IBox size={12} color="white" />
                    </div>
                  )}
                  <button
                    className="absolute right-0 top-0 m-2 rounded-full bg-secondary p-1 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingTitle(!isEditingTitle);
                      if (!isEditingTitle) {
                        setTimeout(() => {
                          if (cardNameRef.current) {
                            const length = cardNameRef.current.value.length;
                            cardNameRef.current.focus();
                            cardNameRef.current.setSelectionRange(
                              length,
                              length,
                            );
                          }
                        }, 0);
                      }
                    }}
                  >
                    <IPencil size={16} />
                  </button>
                </div>

                <div className="flex w-full items-center justify-between gap-2">
                  <p className="line-clamp-3 overflow-ellipsis break-words text-start text-base font-normal">
                    {cardName}
                  </p>
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={card.createdBy.image ?? ""}
                      alt={card.createdBy.name ?? ""}
                    />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </DialogTrigger>
          ) : (
            <div className="flex h-fit w-full flex-col items-start justify-start gap-4 rounded-sm p-2">
              <div className="relative h-32 w-full">
                <Image src={card.gifUrl} fill alt={"GIF"} />
                <button
                  className="absolute right-0 top-0 m-2 rounded-full bg-secondary p-1 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add your button click logic here
                    setIsEditingTitle(!isEditingTitle);
                  }}
                >
                  <ICross size={16} />
                </button>
              </div>
              <div className="flex w-full items-center justify-between gap-2">
                <textarea
                  className="flex-2 w-full resize-none rounded-sm bg-transparent px-2 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                  ref={cardNameRef}
                  value={cardName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditingTitle(false);
                    }
                  }}
                  onChange={handleChange}
                  rows={1}
                />
                <div className="flex w-full flex-1 items-end justify-end">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={card.createdBy.image ?? ""}
                      alt={card.createdBy.name ?? ""}
                    />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          )}

          <CardDialog card={card} />
        </div>
      </Dialog>
    );

  return (
    <div
      className={`flex items-center justify-between rounded-lg border-2 border-neutral10 bg-white ${card.archived ? "opacity-60" : ""}`}
    >
      <Dialog>
        {!isEditingTitle ? (
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className={`m-1 flex h-9 w-full items-center justify-start text-ellipsis rounded-sm bg-transparent px-2 hover:bg-secondary ${card.archived ? "border-2 border-dashed border-gray-400" : ""}`}
            >
              <div className="flex items-center gap-2 rounded-md">
                {card.archived && <IBox size={16} color="gray" />}
                <p className="line-clamp-3 overflow-ellipsis text-wrap text-start text-base font-normal">
                  {cardName}
                </p>
              </div>
            </Button>
          </DialogTrigger>
        ) : (
          <textarea
            className="m-0.5 w-full resize-none rounded-sm bg-transparent p-2 focus-visible:bg-transparent focus-visible:outline-none"
            ref={cardNameRef}
            value={cardName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditingTitle(false);
              }
            }}
            onChange={handleChange}
            rows={1}
          />
        )}

        <CardDialog card={card} />
      </Dialog>
      <Button
        variant="ghost"
        className="mx-1"
        onClick={() => {
          setIsEditingTitle(!isEditingTitle);
          if (!isEditingTitle) {
            setTimeout(() => {
              if (cardNameRef.current) {
                const length = cardNameRef.current.value.length;
                cardNameRef.current.focus();
                cardNameRef.current.setSelectionRange(length, length);
              }
            }, 0);
          }
        }}
      >
        {!isEditingTitle ? <IPencil /> : <ITick />}
      </Button>
    </div>
  );
}
