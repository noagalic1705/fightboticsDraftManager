import React from "react";
import { useNavigate } from "react-router";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  // Placeholder for time calculations
  const teamTimeLeft = "00:00"; // Replace with calculated value
  const opponentTimeLeft = "00:00"; // Replace with calculated value

  // Determine card color based on priority
  const cardColor = team.isPenalized
    ? "bg-red-500 border-red-700"
    : team.isReady
    ? "bg-green-500 border-green-700"
    : parseInt(teamTimeLeft.replace(":", "")) < 0
    ? "bg-yellow-500 border-yellow-700"
    : "bg-gray-300 border-gray-500";

  return (
    <div
      className={`rounded-lg border-4 p-4 ${cardColor} flex flex-col justify-between`}
    >
      <h2 className="text-xl font-bold">{team.name}</h2>
      <div className="flex justify-between mt-2">
        <div>
          <p className="font-semibold">Time Left: {teamTimeLeft}</p>
          <p>Opponent: {team.opponent || "N/A"}</p>
          <p>Opponent Time Left: {opponentTimeLeft}</p>
        </div>
        <p className="font-semibold">Stage: {team.stage || "N/A"}</p>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/editTeam")}
      >
        Edit
      </button>
    </div>
  );
};

export default TeamCard;
