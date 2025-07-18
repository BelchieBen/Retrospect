"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
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

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    category: string;
    columns: Array<{
      name: string;
      position: number;
    }>;
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState(`${template.name} Board`);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const getGradientClasses = (color: string) => {
    switch (color) {
      case "teal":
        return "bg-gradient-to-br from-teal10 to-teal50";
      case "green":
        return "bg-gradient-to-br from-green10 to-green50";
      case "pink":
        return "bg-gradient-to-br from-pink10 to-pink50";
      case "orange":
        return "bg-gradient-to-br from-orange10 to-orange50";
      default:
        return "bg-gradient-to-br from-neutral10 to-neutral50";
    }
  };

  const createFromTemplate = api.board.createFromTemplate.useMutation({
    onSuccess: (board) => {
      toast.success(`Board "${board.name}" created successfully!`);
      setOpen(false);
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
    <Card className="cursor-pointer border-neutral20 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-neutral60">
      <div
        className={`relative h-20 overflow-hidden rounded-t-xl ${getGradientClasses(template.color)}`}
      >
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="bg-white/90 text-xs text-black">
            TEMPLATE
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 text-2xl">
          {template.icon}
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-black dark:text-white">
            {template.name}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {template.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-xs text-neutral60 dark:text-neutral40">
          {template.description}
        </CardDescription>
        <div className="mt-2">
          <p className="text-xs text-neutral50 dark:text-neutral50">
            Includes: {template.columns.map((col) => col.name).join(", ")}
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="mt-3 w-full" size="sm" variant="outline">
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
      </CardContent>
    </Card>
  );
}
