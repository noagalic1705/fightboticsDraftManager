import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfiguration";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDoc
} from "firebase/firestore";

const MatchEdit = ({ match }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam1, setSelectedTeam1] = useState(match.team1 || "");
  const [selectedTeam2, setSelectedTeam2] = useState(match.team2 || "");

  useEffect(() => {
    const q = query(collection(db, "teams"), where("stage", "==", ""));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const teamList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setTeams(teamList);
    });

    return () => unsubscribe();
  }, []);

  const updateTeamValues = async (teamId, stage) => {
    const teamRef = doc(db, "teams", teamId);
    await updateDoc(teamRef, { stage });
  };

  const updateTeamOpponents = async (teamId1, teamId2, oppName1, oppName2) => {
    if (!teamId1) {
      const teamRef2 = doc(db, "teams", teamId2);
      await updateDoc(teamRef2, { opponent: oppName2});
    }
    else if (!teamId2) {
      const teamRef1 = doc(db, "teams", teamId1);
      await updateDoc(teamRef1, { opponent: oppName1});
    }
    else if (!teamId1 && !teamId2){
      console.log("no");
    }
    else {
      const teamRef1 = doc(db, "teams", teamId1);
      const teamRef2 = doc(db, "teams", teamId2);
      await updateDoc(teamRef1, { opponent: oppName1});
      await updateDoc(teamRef2, { opponent: oppName2});
    }
  };

  const updateNextMatchValues = async (matchId, winner) => {
    const matchRef = doc(db, "brackets", matchId);
    const matchSnap = await getDoc(matchRef);
    const matchData = matchSnap.data();
    if (matchData.team1) {
      await updateDoc(matchRef, { team2: winner});
    }
    else {
      await updateDoc(matchRef, { team1: winner});
    }
  };

  const updateMatchValues = async (matchId, winner) => {
    const matchRef = doc(db, "brackets", matchId);
    await updateDoc(matchRef, { winner: winner});
  };

  const handleSetTeams = async () => {
    if (selectedTeam1 && selectedTeam2 && selectedTeam1 !== selectedTeam2) {
      const matchRef = doc(db, "brackets", match.id);
      await updateDoc(matchRef, {
        team1: selectedTeam1,
        team2: selectedTeam2,
      });

      await updateTeamValues(selectedTeam1, match.id);
      await updateTeamValues(selectedTeam2, match.id);
      await updateTeamOpponents(selectedTeam1, selectedTeam2, selectedTeam2, selectedTeam1);
      alert("Teams updated successfully!");
    } else if (selectedTeam2 && !selectedTeam1) {
      const matchRef = doc(db, "brackets", match.id);
      await updateDoc(matchRef, {
        team2: selectedTeam2,
      });

      await updateTeamValues(selectedTeam2, match.id);
    } else if (selectedTeam1 && !selectedTeam2) {
      const matchRef = doc(db, "brackets", match.id);
      await updateDoc(matchRef, {
        team1: selectedTeam1,
      });

      await updateTeamValues(selectedTeam1, match.id);
    } else {
      alert("Please select two different teams.");
    }
  };

  const handleClearMatchup = async () => {
    const matchRef = doc(db, "brackets", match.id);
    await updateDoc(matchRef, { winner: null, team1: "", team2: "" });

    if (match.team1) await updateTeamValues(match.team1, "");
    if (match.team2) await updateTeamValues(match.team2, "");
    await updateTeamOpponents(selectedTeam1, selectedTeam2, "", "");

    setSelectedTeam1("");
    setSelectedTeam2("");
    alert("Matchup cleared!");
  };

  const handleSelectWinner = async (winnerId) => {
    const loserId =
      winnerId === selectedTeam1 ? selectedTeam2 : selectedTeam1;

    if (match.next_match_id) {
      await updateTeamValues(winnerId, match.next_match_id);
      await updateMatchValues(match.id, winnerId);
      await updateNextMatchValues(match.next_match_id, winnerId);
      await updateTeamOpponents(selectedTeam1, selectedTeam2, "", "");
    }

    if (match.loser_bracket_id) {
      await updateTeamValues(loserId, match.loser_bracket_id);
      await updateNextMatchValues(match.loser_bracket_id, loserId);
    } else {
      await updateTeamValues(loserId, "DQ");
    }

    alert("Winner updated successfully!");
  };

  return (
    <div className="p-4 border rounded shadow-md bg-gray-100">
      <h3 className="font-bold text-center mb-4">Edit Match {match.id}</h3>

      {/* Team Selection */}
      <div className="flex flex-col justify-between mb-4">
        <div className="border-b-4 border-black">
          <label className="block mb-2">Team 1</label>
          <select
            value={selectedTeam1}
            onChange={(e) => setSelectedTeam1(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <div>Current team: {match.team1}</div>
        </div>
        <div className="border-b-4 border-black">
          <label className="block mb-2">Team 2</label>
          <select
            value={selectedTeam2}
            onChange={(e) => setSelectedTeam2(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <div>Current team: {match.team2}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handleSetTeams}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Set Teams
        </button>
        <button
          onClick={handleClearMatchup}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Matchup
        </button>
      </div>

      {/* Winner Selection */}
      <div>
        <h4 className="text-center font-bold mb-2">Select Winner</h4>
        <div className="flex justify-around">
          <button
            onClick={() => handleSelectWinner(selectedTeam1)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={!selectedTeam1 || !selectedTeam2}
          >
            {match.team1 || "Team 1"}
          </button>
          <button
            onClick={() => handleSelectWinner(selectedTeam2)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={!selectedTeam1 || !selectedTeam2}
          >
            {match.team2 || "Team 2"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchEdit;
