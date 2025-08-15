"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { useCreateFeedback } from "~/lib/api/feedback/feedback-queries";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "sonner";

const feedbackSchema = z.object({
  type: z.enum(["bug", "feature", "improvement", "general"], {
    required_error: "Please select a feedback type",
  }),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  anonymous: z.boolean().default(false),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const { data: session } = useSession();
  const createFeedbackMutation = useCreateFeedback();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type: undefined,
      subject: "",
      message: "",
      email: "",
      anonymous: false,
    },
  });

  const isAnonymous = form.watch("anonymous");

  const onSubmit = (data: FeedbackFormValues) => {
    createFeedbackMutation.mutate(
      {
        type: data.type,
        subject: data.subject,
        message: data.message,
        email: data.anonymous ? undefined : data.email,
        anonymous: data.anonymous,
        userId: data.anonymous ? undefined : session?.user?.id,
      },
      {
        onSuccess: () => {
          toast.success(
            "Feedback submitted successfully! Thank you for helping us improve.",
          );
          form.reset();
        },
        onError: (error) => {
          console.error("Error submitting feedback:", error);
          toast.error("Error submitting feedback. Please try again later.");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Feedback Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white">
                Feedback Type *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-neutral20 hover:border-teal70 focus:border-teal70 dark:border-neutral70">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="improvement">
                    Improvement Suggestion
                  </SelectItem>
                  <SelectItem value="general">General Feedback</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white">
                Subject *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Brief description of your feedback"
                  className="border-neutral20 hover:border-teal70 focus:border-teal70 dark:border-neutral70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white">
                Message *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your feedback, suggestions, or issues you've encountered..."
                  className="min-h-[120px] resize-none border-neutral20 hover:border-teal70 focus:border-teal70 dark:border-neutral70"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-xs text-neutral60 dark:text-neutral40">
                <span>Please provide as much detail as possible</span>
                <span>{field.value?.length || 0}/1000</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Anonymous Checkbox */}
        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-neutral20 text-teal70 focus:ring-teal70 dark:border-neutral70"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-black dark:text-white">
                  Submit anonymously
                </FormLabel>
                <p className="text-sm text-neutral60 dark:text-neutral40">
                  We won&apos;t be able to follow up with you if you choose this
                  option
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Email (only if not anonymous) */}
        {!isAnonymous && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Email (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="border-neutral20 hover:border-teal70 focus:border-teal70 dark:border-neutral70"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-neutral60 dark:text-neutral40">
                  Provide your email if you&apos;d like us to follow up with you
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={createFeedbackMutation.isPending}
            className="bg-teal70 hover:bg-teal80 dark:bg-teal60 dark:hover:bg-teal70"
          >
            {createFeedbackMutation.isPending
              ? "Submitting..."
              : "Submit Feedback"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
