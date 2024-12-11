import React, { useState } from "react";
import { useNavigate } from "react-router";
import Timer from "./timer";

const TeamCard = ({ team, opponent }) => {
  const navigate = useNavigate();

  const [isNegativeTeam, setIsNegativeTeam] = useState(false);

  const handleNegativeTimeTeam = () => {
    setIsNegativeTeam(true);
  }

  const cardColor = team.isPenalized
    ? "bg-red-500 border-red-700"
    : team.isReady
      ? "bg-green-500 border-green-700"
      : isNegativeTeam
        ? "bg-yellow-500 border-yellow-700"
        : "bg-gray-300 border-gray-500";


  const handleEditTeam = (teamId) => {
    navigate(`/editTeam/${teamId}`);
  };

  return (
    <div
      className={`rounded-lg border-4 p-4 ${cardColor} flex flex-col justify-between`}
    >
      <h2 className="text-xl font-bold">{team.name}</h2>
      <div className="flex justify-between mt-2">
        <div>
          <p className="font-semibold">Time Left: <Timer startAt={team.startAt} timerStart={team.timerStarted} onNegative={handleNegativeTimeTeam} /></p>
          <p className="font-semibold">Stage: {team.stage || "N/A"}</p>
          <p>Opponent: {team.opponent || "N/A"}</p>
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleEditTeam(team.id)}
      >
        Edit
      </button>
    </div>
  );
};

export default TeamCard;
