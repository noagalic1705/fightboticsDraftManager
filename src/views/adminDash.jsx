import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfiguration";
import TeamCard from "../components/teamCard";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      const teamsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort alphabetically by team name
      const sortedTeams = teamsData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setTeams(sortedTeams);

      // Find matchups
      const currentMatchups = [];
      teamsData.forEach((team) => {
        if (team.opponent) {
          const matchupKey = [team.name, team.opponent].sort().join("-");
          if (!currentMatchups.some((m) => m.key === matchupKey)) {
            currentMatchups.push({
              key: matchupKey,
              teamA: team,
              teamB: teamsData.find((t) => t.id === team.opponent) || null,
            });
          }
        }
      });

      // Sort matchups
      const sortedMatchups = currentMatchups.sort((a, b) => {
        const isReadyA =
          a.teamA.isReady && a.teamB && a.teamB.isReady ? -1 : 0;
        const isMinusTimeA =
          parseInt(a.teamA.timeLeft.replace(":", "")) < 0 &&
          a.teamB &&
          parseInt(a.teamB.timeLeft.replace(":", "")) < 0
            ? -1
            : 0;

        const isReadyB =
          b.teamA.isReady && b.teamB && b.teamB.isReady ? -1 : 0;
        const isMinusTimeB =
          parseInt(b.teamA.timeLeft.replace(":", "")) < 0 &&
          b.teamB &&
          parseInt(b.teamB.timeLeft.replace(":", "")) < 0
            ? -1
            : 0;

        if (isReadyA !== isReadyB) return isReadyA - isReadyB;
        if (isMinusTimeA !== isMinusTimeB) return isMinusTimeA - isMinusTimeB;

        const timeA =
          Math.max(0, parseInt(a.teamA.timeLeft.replace(":", ""))) +
          (a.teamB ? Math.max(0, parseInt(a.teamB.timeLeft.replace(":", ""))) : 0);
        const timeB =
          Math.max(0, parseInt(b.teamA.timeLeft.replace(":", ""))) +
          (b.teamB ? Math.max(0, parseInt(b.teamB.timeLeft.replace(":", ""))) : 0);

        return timeA - timeB;
      });

      setMatchups(sortedMatchups);
    };

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      <div className="w-1/4 pl-8 border-r-5 border-black">
        <h2 className="text-2xl font-bold mb-4">Matchups</h2>
        <div className="space-y-4">
          {matchups.map((matchup) => (
            <div
              key={matchup.key}
              className="bg-gray-300 p-4 rounded-lg shadow"
            >
              <div className="flex justify-between">
                <span
                  className={`font-bold ${
                    matchup.teamA.isReady ? "text-green-500" : ""
                  } ${
                    parseInt(matchup.teamA.timeLeft.replace(":", "")) < 0
                      ? "text-yellow-500"
                      : ""
                  }`}
                >
                  {matchup.teamA.teamSC}
                </span>
                <span>vs</span>
                <span
                  className={`font-bold ${
                    matchup.teamB?.isReady ? "text-green-500" : ""
                  } ${
                    matchup.teamB &&
                    parseInt(matchup.teamB.timeLeft.replace(":", "")) < 0
                      ? "text-yellow-500"
                      : ""
                  }`}
                >
                  {matchup.teamB?.teamSC || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-6">Teams</h1>
        <div className="grid grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
