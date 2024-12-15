import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfiguration";
import Match from "./match";
import MatchEdit from "./matchEdit";

const Bracket = ({ isEdit, isWinner }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = () => {
          const q = collection(db, "brackets");
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const matchData = querySnapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter((match) =>
                isWinner ? match.id.includes("G") : match.id.includes("L")
              );
      
            setMatches(matchData);
          });
      
          return () => unsubscribe(); // Clean up the subscription
        };
      
        fetchMatches();
      }, [isWinner]);

    const rounds = matches.reduce((acc, match) => {
        acc[match.round] = acc[match.round] || [];
        acc[match.round].push(match);
        return acc;
    }, {});

    const roundNames = isWinner ? ["Pripravna runda", "Četvrtina finala", "Polufinale", "Pre-Finale", "Veliko finale"] : ["Pripravna runda", "Četvrtina finala", "Polufinale", "Pre-Finale", "Malo finale"];

    return (
        <div className="grid grid-cols-6 gap-4 p-4 min-h-screen flex items-center justify-center">
            {Object.keys(rounds).map((round) => (
                <div key={round} className="space-y-4">
                    <h3 className="text-center font-bold text-gray-300">{roundNames[round-1]}</h3>
                    {rounds[round].map((match) =>
                        isEdit ? (
                            <MatchEdit key={match.id} match={match} />
                        ) : (
                            <Match key={match.id} match={match} />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default Bracket;
