"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { X } from "lucide-react";
import axios, { type AxiosResponse } from "axios";
import { backendUrl } from "~/constants/backendUrl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type Boards } from "@prisma/client";
import { useState } from "react";

function getRandomGradient() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF5",
    "#F5FF33",
    "#FF8C33",
    "#8C33FF",
  ];
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(45deg, ${color1}, ${color2})`;
}

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Board title is required",
  }),
});

interface CreateBoardProps {
  readonly children?: React.ReactNode;
}

export function CreateBoard({ children }: CreateBoardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response: AxiosResponse<Boards> = await axios.post(
      `${backendUrl}/boards`,
      {
        title: data.title,
        ownerId: session?.user?.id,
      },
    );
    if (response.status === 200) {
      form.reset();
      setOpen(false);
      router.push(`/boards/${response.data.id}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="default"
            className="rounded-md border-none bg-teal80 text-white"
          >
            Create Board
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 sm:max-w-[500px]">
        {/* Header */}
        <DialogHeader className="rounded-t-lg bg-neutral05 px-6 py-4 dark:bg-neutral80">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-neutral100 dark:text-white">
              Create New Board
            </DialogTitle>
          </div>
          <p className="mt-1 text-sm text-neutral90 dark:text-neutral40">
            Start collaborating with your team on a new board
          </p>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Background Selection */}
          {/* <div className="space-y-3">
            <h4 className="text-sm font-medium text-neutral100 dark:text-neutral30">
              Background
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`bg-${i}`}
                  className="h-12 cursor-pointer rounded-lg transition-colors hover:border-teal60 dark:border-neutral60"
                  style={{ background: getRandomGradient() }}
                />
              ))}
            </div>
          </div> */}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral100 dark:text-neutral30">
                      Board Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter board title..."
                        className="h-10 border-neutral70 bg-white dark:border-neutral60 dark:bg-neutral90"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-neutral30 text-neutral70 dark:border-neutral60 dark:text-neutral30"
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="bg-teal60 text-white hover:bg-teal70"
          >
            Create Board
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
