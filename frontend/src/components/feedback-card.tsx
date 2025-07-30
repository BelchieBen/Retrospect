"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  AlertTriangle,
  Lightbulb,
  Wrench,
  FileText,
  User,
  Mail,
  Calendar,
} from "lucide-react";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "bug":
      return <AlertTriangle className="h-4 w-4" />;
    case "feature":
      return <Lightbulb className="h-4 w-4" />;
    case "improvement":
      return <Wrench className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getTypeBadgeVariant = (
  type: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (type) {
    case "bug":
      return "destructive";
    case "feature":
      return "default";
    case "improvement":
      return "secondary";
    default:
      return "outline";
  }
};

const formatType = (type: string) => {
  switch (type) {
    case "bug":
      return "Bug Report";
    case "feature":
      return "Feature Request";
    case "improvement":
      return "Improvement";
    default:
      return "General Feedback";
  }
};

interface FeedbackCardProps {
  feedback: {
    id: string;
    type: string;
    subject: string;
    message: string;
    email?: string | null;
    anonymous: boolean;
    createdAt: Date;
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
    } | null;
  };
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <Card className="border-neutral20 transition-shadow hover:shadow-md dark:border-neutral70">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral10 dark:bg-neutral80">
              {getTypeIcon(feedback.type)}
            </div>
            <div>
              <h3 className="font-semibold text-black dark:text-white">
                {feedback.subject}
              </h3>
              <Badge
                variant={getTypeBadgeVariant(feedback.type)}
                className="mt-1"
              >
                {formatType(feedback.type)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message */}
        <div>
          <p className="text-neutral80 dark:text-neutral20">
            {feedback.message}
          </p>
        </div>

        {/* User Info */}
        <div className="flex flex-wrap gap-4 text-sm text-neutral60 dark:text-neutral40">
          {feedback.anonymous ? (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Anonymous</span>
            </div>
          ) : (
            <>
              {feedback.user?.name && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{feedback.user.name}</span>
                </div>
              )}
              {(feedback.email ?? feedback.user?.email) && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{feedback.email ?? feedback.user?.email}</span>
                </div>
              )}
            </>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
