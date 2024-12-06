import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfiguration"; // Import your Firebase config file
import { collection, addDoc, getDocs } from "firebase/firestore";

const TeamForm = () => {
  const [name, setName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [stage, setStage] = useState("");
  const [stageNumber, setStageNumber] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [isPenalized, setIsPenalized] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [teams, setTeams] = useState([]);

  // Fetch existing teams from Firestore to populate the opponent dropdown
  useEffect(() => {
    const fetchTeams = async () => {
      const teamsCollection = collection(db, "teams");
      const teamsSnapshot = await getDocs(teamsCollection);
      setTeams(teamsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTeam = {
        name,
        opponent,
        stage,
        stageNumber,
        timeLeft,
        isPenalized,
        isReady,
      };
      await addDoc(collection(db, "teams"), newTeam);
      alert("Team added successfully!");
      // Reset form fields
      setName("");
      setOpponent("");
      setStage("");
      setStageNumber("");
      setTimeLeft("");
      setIsPenalized(false);
      setIsReady(false);
    } catch (error) {
      console.error("Error adding team: ", error);
      alert("Failed to add team.");
    }
  };

  const stageOptions = [
    "Group Stage",
    "Quarterfinals",
    "Semifinals",
    "Finals",
    "Round of 16",
    "Third Place Match",
    "Preliminaries",
    "Playoffs",
  ];

  const stageNumberOptions = ["1", "2", "3", "4"]; // Placeholder

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Team Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Opponent:</label>
        <select
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          required
        >
          <option value="">Select an Opponent</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Stage:</label>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          required
        >
          <option value="">Select a Stage</option>
          {stageOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Stage Number:</label>
        <select
          value={stageNumber}
          onChange={(e) => setStageNumber(e.target.value)}
          required
        >
          <option value="">Select a Stage Number</option>
          {stageNumberOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Time Left (MM:SS):</label>
        <input
          type="text"
          pattern="\\d{2}:\\d{2}"
          placeholder="00:00"
          value={timeLeft}
          onChange={(e) => setTimeLeft(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Penalized:</label>
        <input
          type="checkbox"
          checked={isPenalized}
          onChange={(e) => setIsPenalized(e.target.checked)}
        />
      </div>

      <div>
        <label>Ready:</label>
        <input
          type="checkbox"
          checked={isReady}
          onChange={(e) => setIsReady(e.target.checked)}
        />
      </div>

      <button type="submit">Add Team</button>
    </form>
  );
};

export default TeamForm;
