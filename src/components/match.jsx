import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfiguration"; // Firebase setup file
import { onSnapshot, collection, query, where } from "firebase/firestore";
import Timer from "./timer";

const Match = ({ match }) => {
    const [team1, setTeam1] = useState(null);
    const [team2, setTeam2] = useState(null);
    const [winner, setWinner] = useState("");
    const [isNegativeTeam1, setIsNegativeTeam1] = useState(false);
    const [isNegativeTeam2, setIsNegativeTeam2] = useState(false);

    const handleNegativeTimeTeam1 = () => {
        setIsNegativeTeam1(true);
    }
    const handleNegativeTimeTeam2 = () => {
        setIsNegativeTeam2(true);
    }

    const cardColor1 = team1
        ? team1.isPenalized
            ? "bg-red-500"
            : winner === match.team1
                ? "bg-green-500"
                : team1.isReady
                    ? "bg-blue-500"
                    : isNegativeTeam1
                        ? "bg-yellow-500 border-yellow-700"
                        : "bg-gray-300 border-gray-500"
        : "bg-gray-300 border-gray-500";

    const cardColor2 = team2
        ? team2.isPenalized
            ? "bg-red-500"
            : winner === match.team2
                ? "bg-green-500"
                : team2.isReady
                    ? "bg-blue-500"
                    : isNegativeTeam2
                        ? "bg-yellow-500 border-yellow-700"
                        : "bg-gray-300 border-gray-500"
        : "bg-gray-300 border-gray-500";
    useEffect(() => {
        const fetchTeams = () => {
          if (!match.team1 || !match.team2) return;
      
          const teamsRef = collection(db, "teams");
      
          const unsubscribeTeam1 = onSnapshot(
            query(teamsRef, where("name", "==", match.team1)),
            (team1Snapshot) => {
              const team1Data = team1Snapshot.docs[0]?.data() || null;
              setTeam1(team1Data);
            },
            (error) => console.error("Error fetching team1 data:", error)
          );
      
          const unsubscribeTeam2 = onSnapshot(
            query(teamsRef, where("name", "==", match.team2)),
            (team2Snapshot) => {
              const team2Data = team2Snapshot.docs[0]?.data() || null;
              setTeam2(team2Data);
            },
            (error) => console.error("Error fetching team2 data:", error)
          );
      
          return () => {
            unsubscribeTeam1();
            unsubscribeTeam2();
          };
        };
      
        fetchTeams();
        setWinner(match.winner);
      }, [match, match.team1, match.team2]);
      

    return (
        <div className="flex flex-col items-center bg-zinc-500 p-2 rounded shadow-md">
            <div className="flex flex-col justify-between w-full">
                <div className={`flex flex-row justify-between ${cardColor1}`}>
                    <div
                        className="p-2 justify-left">
                        {match.team1 ? match.team1 : "---"}
                    </div>
                    <div className="p-2">
                        {team1 !== null && !winner ? <Timer startAt={team1.startAt} timerStart={team1.timerStarted} onNegative={handleNegativeTimeTeam1} timerStop={team1.timerStoppedAt} /> : ""}
                    </div>
                </div>
                <span className="h-1 w-full bg-black">
                </span>
                <div className={`flex flex-row justify-between ${cardColor2}`}>
                    <div
                        className={`p-2 justify-left`}>
                        {match.team2 ? match.team2 : "---"}
                    </div>
                    <div className="p-2">
                        {team2 !== null && !winner ? <Timer startAt={team2.startAt} timerStart={team2.timerStarted} onNegative={handleNegativeTimeTeam2} timerStop={team2.timerStoppedAt} /> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Match;
