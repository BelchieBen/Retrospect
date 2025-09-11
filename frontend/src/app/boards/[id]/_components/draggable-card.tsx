"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type CardWithDetails } from "~/lib/zustand/cards/cards-store";
import { Card } from "./card";

export default function DraggableCard({
  card,
}: Readonly<{
  card: CardWithDetails;
}>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Simple and fast event handler that prevents drag from form elements
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    // Quick check: if it's a form element, stop the event from reaching the drag listeners
    if (
      target.tagName === "TEXTAREA" ||
      target.tagName === "INPUT" ||
      target.contentEditable === "true"
    ) {
      e.stopPropagation();
      return;
    }
    // Let the original drag listener handle it
    listeners?.onPointerDown?.(e);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={handlePointerDown}
    >
      <Card card={card} />
    </div>
  );
}
