import { useRef, useEffect } from "react";
import { cn } from "~/lib/utils";

export function TextareaAutosize(
  props: Readonly<React.TextareaHTMLAttributes<HTMLTextAreaElement>>,
  className: string | undefined,
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
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

  return (
    <textarea
      {...props}
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={textareaRef}
      style={{ overflow: "hidden", resize: "none" }}
    />
  );
}
