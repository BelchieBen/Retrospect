"use client";

import { Input } from "~/components/ui/input";
import { IUsers, ISearch } from "~/icons";
import AvailableTeamItem from "../available-team-item";
import MyTeamItem from "../my-team-item";
import { useState } from "react";
import HelixPalette from "~/styles/palette";
import type { UserTeamMembership, TeamWithMembers } from "../../page";
import {
  useAvailableTeams,
  useJoinTeam,
  useLeaveTeam,
  useMyTeams,
} from "~/lib/api/team-members/members-queries";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface TeamsTabProps {
  initialMyTeams: UserTeamMembership[];
  initialAvailableTeams: TeamWithMembers[];
}

export default function TeamsTab({
  initialMyTeams,
  initialAvailableTeams,
}: TeamsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const joinTeamMutation = useJoinTeam();
  const leaveTeamMutation = useLeaveTeam();

  const { data: myTeams } = useMyTeams(initialMyTeams);
  const { data: availableTeams } = useAvailableTeams({
    initialData: initialAvailableTeams,
  });

  // Filter available teams by search term
  const filteredAvailableTeams = availableTeams?.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRequestJoin = (teamId: string) => {
    const team = availableTeams?.find((t) => t.id === teamId);
    if (team) {
      joinTeamMutation.mutate(teamId, {
        onSuccess: () => {
          toast.success(`Successfully joined "${team.name}"!`);
        },
        onError: (error) => {
          console.error("Failed to join team:", error);
          toast.error(`Failed to join "${team.name}". Please try again.`);
        },
      });
    }
  };

  const handleLeaveTeam = (teamId: string) => {
    const teamMember = myTeams?.find((tm) => tm.team.id === teamId);
    if (teamMember) {
      // Check if this user is the only member in the team
      const isLastMember = teamMember.team.members?.length === 1;

      if (isLastMember) {
        // Show confirmation modal for team deletion
        setTeamToDelete({
          id: teamId,
          name: teamMember.team.name,
        });
        setShowDeleteModal(true);
      } else {
        // Proceed with normal leave
        performLeaveTeam(teamId, teamMember.team.name, false);
      }
    }
  };

  const performLeaveTeam = (
    teamId: string,
    teamName: string,
    isLastMember = false,
  ) => {
    leaveTeamMutation.mutate(teamId, {
      onSuccess: () => {
        if (isLastMember) {
          toast.success(`Team "${teamName}" has been deleted`);
        } else {
          toast.success(`Successfully left "${teamName}"`);
        }
        setShowDeleteModal(false);
        setTeamToDelete(null);
      },
      onError: (error) => {
        console.error("Failed to leave team:", error);
        if (isLastMember) {
          toast.error(`Failed to delete "${teamName}". Please try again.`);
        } else {
          toast.error(`Failed to leave "${teamName}". Please try again.`);
        }
      },
    });
  };

  const handleConfirmLeaveAndDelete = () => {
    if (teamToDelete) {
      performLeaveTeam(teamToDelete.id, teamToDelete.name, true);
    }
  };
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IUsers size={20} />
          <h2 className="text-lg font-semibold text-neutral90 dark:text-white">
            My Teams
          </h2>
          <span className="ml-auto text-sm text-neutral60 dark:text-neutral40">
            {myTeams?.length} team{myTeams?.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral05 drop-shadow-xl dark:border-neutral60">
          {myTeams?.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white py-12 text-center dark:bg-neutral05">
              <IUsers color={HelixPalette.neutral40} size={48} />
              <p className="mt-2 text-neutral60 dark:text-neutral40">
                You haven&apos;t joined any teams yet
              </p>
              <p className="text-sm text-neutral50 dark:text-neutral50">
                Browse available teams below to request access
              </p>
            </div>
          ) : (
            myTeams?.map((teamMember, index) => (
              <MyTeamItem
                key={teamMember.id}
                teamMember={teamMember}
                isEven={index % 2 === 1}
                onLeaveTeam={handleLeaveTeam}
                isLoading={leaveTeamMutation.isPending}
              />
            ))
          )}
        </div>
      </div>

      {/* Available Teams to Join */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ISearch size={20} />
          <h2 className="text-lg font-semibold text-neutral90 dark:text-white">
            Available Teams
          </h2>
          <span className="ml-auto text-sm text-neutral60 dark:text-neutral40">
            {filteredAvailableTeams?.length} team
            {filteredAvailableTeams?.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <ISearch
            color={HelixPalette.neutral60}
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teams..."
            className="border-neutral20 pl-10 dark:border-neutral60"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral05 drop-shadow-xl dark:border-neutral60">
          {filteredAvailableTeams?.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white py-12 text-center dark:bg-neutral05">
              <ISearch color={HelixPalette.neutral40} size={48} />
              <p className="mt-2 text-neutral60 dark:text-neutral40">
                {searchTerm
                  ? "No teams found matching your search"
                  : "No teams available to join"}
              </p>
              {searchTerm && (
                <p className="text-sm text-neutral50 dark:text-neutral50">
                  Try adjusting your search terms
                </p>
              )}
            </div>
          ) : (
            filteredAvailableTeams?.map((team, index) => (
              <AvailableTeamItem
                key={team.id}
                team={team}
                onRequestJoin={handleRequestJoin}
                isEven={index % 2 === 1}
                isLoading={joinTeamMutation.isPending}
              />
            ))
          )}
        </div>
      </div>

      {/* Team Deletion Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Delete Team
            </DialogTitle>
            <DialogDescription className="pt-2">
              You are the only member of &ldquo;{teamToDelete?.name}&rdquo;.
              Leaving this team will permanently delete it. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setTeamToDelete(null);
              }}
              disabled={leaveTeamMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmLeaveAndDelete}
              disabled={leaveTeamMutation.isPending}
            >
              {leaveTeamMutation.isPending ? "Deleting..." : "Delete Team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
