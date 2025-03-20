import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

const TextareaAutosize = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = innerRef.current;
    if (textarea) {
      const resizeTextarea = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener("input", resizeTextarea);
      resizeTextarea();

      return () => {
        textarea.removeEventListener("input", resizeTextarea);
      };
    }
  }, []);

  React.useImperativeHandle(ref, () => innerRef.current);

  return (
    <textarea
      {...props}
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={innerRef}
      style={{ overflow: "hidden", resize: "none" }}
    />
  );
});
TextareaAutosize.displayName = "TextareaAutosize";

export { TextareaAutosize };
