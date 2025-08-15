"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { IPlus, IUsers, IUser } from "~/icons";
import HelixPalette from "~/styles/palette";
import type { User } from "../../page";
import UserItem from "../user-item";

interface CreateTeamTabProps {
  users: User[];
}

export default function CreateTeamTab({ users }: CreateTeamTabProps) {
  const [teamName, setTeamName] = useState("");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<User[]>([]);

  // Filter users for team creation - exclude those already selected
  const availableUsers = users.filter(
    (user) => !selectedTeamMembers.some((member) => member.id === user.id),
  );

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      alert("Please enter a team name");
      return;
    }
    if (selectedTeamMembers.length === 0) {
      alert("Please add at least one team member");
      return;
    }

    // TODO: Implement actual team creation logic
    console.log("Creating team:", {
      name: teamName,
      members: selectedTeamMembers.map((m) => m.id),
    });
    alert(
      `Team "${teamName}" would be created with ${selectedTeamMembers.length} members`,
    );
    setTeamName(""); // Reset form
    setSelectedTeamMembers([]); // Reset selected members
  };

  const handleAddUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedTeamMembers([...selectedTeamMembers, user]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedTeamMembers(
      selectedTeamMembers.filter((member) => member.id !== userId),
    );
  };
  return (
    <Card className="border-neutral20 dark:border-neutral60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neutral90 dark:text-white">
          <IPlus color={HelixPalette.teal60} size={20} />
          Create New Team
          <span className="ml-auto text-sm font-normal text-neutral60 dark:text-neutral40">
            {selectedTeamMembers.length} member
            {selectedTeamMembers.length !== 1 ? "s" : ""} selected
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Team Name */}
        <div className="space-y-2">
          <Label
            htmlFor="teamName"
            className="text-neutral80 dark:text-neutral30"
          >
            Team Name
          </Label>
          <Input
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name..."
            className="border-neutral20 dark:border-neutral60"
          />
        </div>

        {/* Step 2: Select Users - Two Column Layout */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-neutral90 dark:text-white">
            Select Team Members
          </h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Available Users */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IUser color={HelixPalette.blue60} size={18} />
                <h4 className="font-medium text-neutral90 dark:text-white">
                  Available Users
                </h4>
                <span className="ml-auto text-sm text-neutral60 dark:text-neutral40">
                  {availableUsers.length} user
                  {availableUsers.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="rounded-lg border border-neutral20 dark:border-neutral60">
                <div className="space-y-3 p-4">
                  {availableUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <IUser color={HelixPalette.neutral40} size={48} />
                      <p className="mt-2 text-neutral60 dark:text-neutral40">
                        All users have been added to the team
                      </p>
                    </div>
                  ) : (
                    availableUsers.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        action="add"
                        onActionClick={handleAddUser}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Selected Team Members */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IUsers color={HelixPalette.teal60} size={18} />
                <h4 className="font-medium text-neutral90 dark:text-white">
                  Team Members
                </h4>
                <span className="ml-auto text-sm text-neutral60 dark:text-neutral40">
                  {selectedTeamMembers.length} member
                  {selectedTeamMembers.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="rounded-lg border border-neutral20 dark:border-neutral60">
                <div className="space-y-3 p-4">
                  {selectedTeamMembers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <IUsers color={HelixPalette.neutral40} size={48} />
                      <p className="mt-2 text-neutral60 dark:text-neutral40">
                        No team members added yet
                      </p>
                      <p className="text-sm text-neutral50 dark:text-neutral50">
                        Add users from the left panel
                      </p>
                    </div>
                  ) : (
                    selectedTeamMembers.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        action="remove"
                        onActionClick={handleRemoveUser}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Create Team Button */}
        <div className="flex justify-end border-t pt-4">
          <Button
            onClick={handleCreateTeam}
            className="bg-teal60 hover:bg-teal70"
            disabled={!teamName.trim() || selectedTeamMembers.length === 0}
            size="lg"
          >
            <IPlus color={HelixPalette.white} size={16} />
            Create Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
