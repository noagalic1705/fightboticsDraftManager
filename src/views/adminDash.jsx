import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfiguration";
import TeamCard from "../components/teamCard";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  
  useEffect(() => {
    const unsubscribeTeams = onSnapshot(
      collection(db, "teams"),
      (querySnapshot) => {
        const teamsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        const sortedTeams = teamsData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
  
        setTeams(sortedTeams);
      },
      (error) => {
        console.error("Error fetching teams: ", error);
      }
    );
  
    return () => unsubscribeTeams();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Teams</h1>
        <div className="grid grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} opponent={team.opponent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
