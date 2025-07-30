"use client";

import { useState, useMemo } from "react";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import { Search, Users } from "lucide-react";
import { UserCard } from "~/components/user-card";

interface UserSearchProps {
  users: Array<{
    id: string;
    name: string | null;
    email: string | null;
    role: "USER" | "ADMIN";
    emailVerified: Date | null;
    image: string | null;
    _count: {
      Boards: number;
      Card: number;
      Comment: number;
      Feedback: number;
    };
  }>;
  currentUserId: string;
}

export function UserSearch({ users, currentUserId }: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase().trim();
    return users.filter((user) => {
      const name = user.name?.toLowerCase() ?? "";
      const email = user.email?.toLowerCase() ?? "";

      return name.includes(query) || email.includes(query);
    });
  }, [users, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          All Users
        </h2>
        <p className="text-sm text-neutral60 dark:text-neutral40">
          {filteredUsers.length} of {users.length} user
          {users.length !== 1 ? "s" : ""}
          {searchQuery && " (filtered)"}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral60 dark:text-neutral40" />
        <Input
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-neutral20 pl-10 hover:border-teal70 focus:border-teal70 dark:border-neutral70"
        />
      </div>

      {/* Users List */}
      {filteredUsers.length > 0 ? (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} currentUserId={currentUserId} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="dark:from-neutral85 border-neutral20 bg-gradient-to-br from-neutral05 to-neutral10 p-8 text-center dark:border-neutral70 dark:to-neutral80">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral20 dark:bg-neutral60">
            {searchQuery ? (
              <Search className="h-8 w-8 text-neutral60 dark:text-neutral40" />
            ) : (
              <Users className="h-8 w-8 text-neutral60 dark:text-neutral40" />
            )}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
            {searchQuery ? "No users found" : "No users found"}
          </h3>
          <p className="text-neutral60 dark:text-neutral40">
            {searchQuery
              ? `No users match "${searchQuery}". Try a different search term.`
              : "This shouldn't happen - there should be at least one user (you!)"}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm text-teal70 hover:text-teal80 dark:text-teal60 dark:hover:text-teal70"
            >
              Clear search
            </button>
          )}
        </Card>
      )}
    </div>
  );
}
