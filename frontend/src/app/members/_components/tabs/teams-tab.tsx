"use client";

import { Input } from "~/components/ui/input";
import { IUsers, ISearch } from "~/icons";
import AvailableTeamItem from "../available-team-item";
import MyTeamItem from "../my-team-item";
import { useState } from "react";
import HelixPalette from "~/styles/palette";
import type { UserTeamMembership, TeamWithMembers } from "../../page";

interface TeamsTabProps {
  myTeams: UserTeamMembership[];
  availableTeams: TeamWithMembers[];
}

export default function TeamsTab({ myTeams, availableTeams }: TeamsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter available teams by search term
  const filteredAvailableTeams = availableTeams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRequestJoin = (teamId: string) => {
    const team = availableTeams.find((t) => t.id === teamId);
    if (team) {
      // TODO: Implement actual join request logic
      console.log("Requesting to join team:", teamId);
      alert(`Join request sent for "${team.name}"`);
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
            {myTeams.length} team{myTeams.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral05 drop-shadow-xl dark:border-neutral60">
          {myTeams.length === 0 ? (
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
            myTeams.map((teamMember, index) => (
              <MyTeamItem
                key={teamMember.id}
                teamMember={teamMember}
                isEven={index % 2 === 1}
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
            {filteredAvailableTeams.length} team
            {filteredAvailableTeams.length !== 1 ? "s" : ""}
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
          {filteredAvailableTeams.length === 0 ? (
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
            filteredAvailableTeams.map((team, index) => (
              <AvailableTeamItem
                key={team.id}
                team={team}
                onRequestJoin={handleRequestJoin}
                isEven={index % 2 === 1}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
