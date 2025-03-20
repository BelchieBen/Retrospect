"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import axios, { type AxiosResponse } from "axios";
import { backendUrl } from "~/constants/backendUrl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type Boards } from "@prisma/client";

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

export function CreateBoard() {
  const { data: session } = useSession();
  const router = useRouter();
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
      router.push(`/boards/${response.data.id}`);
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-24 rounded-md bg-secondary">
            Create Board
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" side="right">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">New Board</h4>
            </div>
            <div>
              <p className="text-sm">Background</p>
              <div className="my-2 grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-md"
                    style={{ background: getRandomGradient() }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex flex-col gap-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Board Title</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-8" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Create
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
