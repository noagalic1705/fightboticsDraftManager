import React, { useState } from "react";
import { db } from "../firebaseConfiguration";
import { doc, setDoc } from "firebase/firestore";

const AddTeam = () => {
  const [name, setName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [stage, setStage] = useState("");
  const [stageNumber, setStageNumber] = useState("");
  const [timeLeft, setTimeLeft] = useState("15:00");
  const [isPenalized, setIsPenalized] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [password, setPassword] = useState("");
  const [startAt, setStartAt] = useState("");
  const [shortcode, setSC] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerStoppedAt, setTimerStoppedAt] = useState("");

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generatePassword(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

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
        password,
        shortcode,
        startAt,
        timerStarted,
        timerStoppedAt
      };
      await setDoc(doc(db, "teams", name), newTeam);
      alert("Team added successfully!");
      setName("");
      setOpponent("");
      setStage("");
      setStageNumber("");
      setTimeLeft("");
      setIsPenalized(false);
      setIsReady(false);
      setPassword("");
      setSC("");
      setStartAt("");
      setTimerStarted(false);
      setTimerStoppedAt("");
    } catch (error) {
      console.error("Error adding team: ", error);
      alert("Failed to add team.");
    }
  };

  return (
    <div class="flex justify-center">
      <form onSubmit={handleSubmit} class="flex flex-col space-y-5">
        <div>
          <label>Team Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            class="border-2 border-black"
          />
        </div>
        <div>
          <label>Team Shortcode:</label>
          <input
            type="text"
            value={shortcode}
            onChange={(e) => setSC(e.target.value)}
            required
            class="border-2 border-black"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            class="border-2 border-black"
          />
          <button
            type="button"
            class="border-2 border-black"
            onClick={() => setPassword(generatePassword(5))
            }>
            Generate Password
          </button>
        </div>
        <button
          type="submit"
          class="flex justify-center border-2 border-black"
        >Add Team</button>
      </form>
    </div>
  );
};

export default AddTeam;
