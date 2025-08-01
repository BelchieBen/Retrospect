"use client";

import {
  useState,
  useEffect,
  useCallback,
  type ChangeEvent,
  useRef,
} from "react";
import { type Prisma } from "@prisma/client";
import { backendUrl } from "~/constants/backendUrl";
import axios from "axios";
import { debounce } from "lodash";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { Edit2, X, Archive, Check } from "lucide-react";
import CardDialog from "./dialog";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

  useEffect(() => {
    setCardName(card.name ?? "");
  }, [card]);

  useEffect(() => {
    if (cardNameRef.current) {
      cardNameRef.current.style.height = "auto";
      cardNameRef.current.style.height = `${cardNameRef.current.scrollHeight}px`;
    }
  }, [cardName, isEditingTitle]);

  const saveCardName = async (name: string) => {
    setCardName(name);
    await axios.put(`${backendUrl}/cards/${card.id}`, {
      name,
    });
  };

  const debouncedSaveColumnTitle = useCallback(
    debounce((name: string) => saveCardName(name), 500),
    [card.id],
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCardName(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    void debouncedSaveColumnTitle(e.target.value);
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
                      <Archive className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <button
                    className="absolute right-0 top-0 m-2 rounded-full bg-secondary p-1 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add your button click logic here
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
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex w-full items-center justify-between">
                  <p className="text-wrap text-start text-base font-normal">
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
            <div className="m-1 flex h-fit w-full flex-col items-start justify-start gap-2 rounded-sm p-2">
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
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
              <textarea
                className="w-full resize-none rounded-sm bg-transparent px-2 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
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
              <div className="flex w-full items-end justify-end">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={card.createdBy.image ?? ""}
                    alt={card.createdBy.name ?? ""}
                  />
                  <AvatarFallback>BB</AvatarFallback>
                </Avatar>
              </div>
            </div>
          )}

          <CardDialog card={card} />
        </div>
      </Dialog>
    );

  return (
    <div
      className={`flex h-11 items-center justify-between rounded-lg border-2 border-neutral10 bg-white ${card.archived ? "opacity-60" : ""}`}
    >
      <Dialog>
        {!isEditingTitle ? (
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className={`m-1 flex h-9 w-full items-center justify-start rounded-sm bg-transparent px-2 hover:bg-secondary ${card.archived ? "border-2 border-dashed border-gray-400" : ""}`}
            >
              <div className="flex items-center gap-2 rounded-md">
                {card.archived && <Archive className="h-4 w-4 text-gray-500" />}
                <p className="text-base font-normal">{cardName}</p>
              </div>
            </Button>
          </DialogTrigger>
        ) : (
          <textarea
            className="m-1 w-full resize-none rounded-sm bg-transparent px-2 focus-visible:bg-transparent focus-visible:outline-none"
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
        {!isEditingTitle ? <Edit2 /> : <Check />}
      </Button>
    </div>
  );
}
