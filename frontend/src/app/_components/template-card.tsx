"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import Image from "next/image";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    color: string;
    image: string;
    category: string;
    columns: Array<{
      name: string;
      position: number;
    }>;
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState(`${template.name}`);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const utils = api.useUtils();

  const createFromTemplate = api.board.createFromTemplate.useMutation({
    onSuccess: async (board) => {
      toast.success(`Board "${board.name}" created successfully!`);
      setOpen(false);

      // Invalidate the boards query to refetch the latest boards in the sidebar
      await utils.board.getBoards.invalidate();

      router.push(`/boards/${board.id}`);
    },
    onError: (error) => {
      toast.error(`Failed to create board: ${error.message}`);
    },
    onSettled: () => {
      setIsCreating(false);
    },
  });

  const handleCreateBoard = () => {
    if (!boardName.trim()) {
      toast.error("Please enter a board name");
      return;
    }

    setIsCreating(true);
    createFromTemplate.mutate({
      templateId: template.id,
      boardName: boardName.trim(),
      columns: template.columns,
    });
  };

  return (
    <Card
      key={template.id}
      className="cursor-pointer border-neutral20 transition-all hover:shadow-md dark:border-neutral60"
    >
      <CardContent className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-center rounded-lg bg-neutral05">
            <Image
              src={template.image}
              alt={template.name}
              width={100}
              height={100}
              className="mb-2"
            />
          </div>
          <h3 className="mt-2 text-sm font-medium text-black dark:text-white">
            {template.name}
          </h3>
          <p className="mt-1 text-xs text-neutral60 dark:text-neutral40">
            {template.description}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`rounded-full bg-${template.color}10 px-2 py-1 text-xs text-${template.color}70 dark:bg-${template.color}20 dark:text-${template.color}60`}
            >
              {template.category}
            </span>
            <span className="text-xs text-neutral50 dark:text-neutral50">
              Popular
            </span>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size={"sm"} className="text-xs">
                Use template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Board from Template</DialogTitle>
                <DialogDescription>
                  Create a new board using the <strong>{template.name}</strong>{" "}
                  template. This will include all the pre-configured columns.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="boardName" className="text-right">
                    Board Name
                  </Label>
                  <Input
                    id="boardName"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    className="col-span-3"
                    placeholder="Enter board name..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateBoard}
                  disabled={isCreating || !boardName.trim()}
                  className="w-full"
                >
                  {isCreating ? "Creating..." : "Create Board"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
