"use client";
import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";

import { Card } from "./draggable-item";
import { type Card as CardModel } from "@prisma/client";

const style = {
  width: 400,
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container = ({ initCards }: { initCards: CardModel[] }) => {
  const [cards, setCards] = useState(initCards);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]!],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback((card: CardModel, index: number) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.name}
        moveCard={moveCard}
      />
    );
  }, []);

  return <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>;
};
