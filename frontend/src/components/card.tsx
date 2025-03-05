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
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { Edit2, X } from "lucide-react";
import CardDialog from "./card-dialog";

export function Card({
  card,
}: Readonly<{
  card: Prisma.CardGetPayload<{
    include: { comments: { include: { createdBy: true } }; column: true };
  }>;
}>) {
  const [cardName, setCardName] = useState(card.name ?? "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const cardNameRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setCardName(card.name ?? "");
  }, [card]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
    void debouncedSaveColumnTitle(e.target.value);
  };

  return (
    <div className="flex h-11 items-center justify-between">
      <Dialog>
        {!isEditingTitle ? (
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="m-1 flex h-9 w-full items-center justify-start rounded-sm bg-transparent px-2 hover:bg-secondary"
            >
              <div className="rounded-md">
                <p className="text-base font-normal">{cardName}</p>
              </div>
            </Button>
          </DialogTrigger>
        ) : (
          <input
            className="m-1 h-9 w-full rounded-sm bg-transparent px-2 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            type="text"
            ref={cardNameRef}
            value={cardName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditingTitle(false);
              }
            }}
            onChange={handleChange}
          />
        )}

        <CardDialog card={card} />
      </Dialog>
      <Button
        variant="ghost"
        onClick={() => {
          setIsEditingTitle(!isEditingTitle);
          if (!isEditingTitle) {
            setTimeout(() => cardNameRef.current?.focus(), 0);
          }
        }}
      >
        {!isEditingTitle ? <Edit2 /> : <X />}
      </Button>
    </div>
  );
}
