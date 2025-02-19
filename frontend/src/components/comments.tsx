"use client";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"; // Adjust the import path as necessary
import { Input } from "~/components/ui/input"; // Adjust the import path as necessary
import { Button } from "~/components/ui/button"; // Adjust the import path as necessary
import { useSession } from "next-auth/react";

type Comment = {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
};

interface CommentsProps {
  onNewComment: () => void;
}

export function Comments({ onNewComment }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { data: session } = useSession();

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user.name) return;
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        user: session.user.name,
        avatar: session.user.image ?? "",
        text: newComment,
        timestamp: new Date().toLocaleString(),
      };
      setComments((prevComments) => [...prevComments, newCommentObj]);
      setNewComment("");
      onNewComment();
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      <div className="mt-2 max-h-[200px] space-y-4 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.user} />
              <AvatarFallback>{comment.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{comment.user}</p>
              <p className="text-sm text-gray-500">{comment.text}</p>
              <p className="text-xs text-gray-400">{comment.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={session?.user.image ?? ""}
              alt={session?.user.name ?? ""}
            />
            <AvatarFallback>{session?.user.name}</AvatarFallback>
          </Avatar>
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow"
          />
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  );
}
