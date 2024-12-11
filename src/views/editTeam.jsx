import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Timer from "../components/timer";
import { db } from "../firebaseConfiguration";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const EditTeam = () => {
  const { teamId } = useParams(); // Get teamId from the route
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [opponents, setOpponents] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamDoc = await getDoc(doc(db, "teams", teamId));
        if (teamDoc.exists()) {
          setTeam({ id: teamDoc.id, ...teamDoc.data() });
          setSelectedOpponent(teamDoc.data().opponent || "");
        }
      } catch (error) {
        console.error("Error fetching team: ", error);
      }
    };

    const fetchOpponents = async () => {
      try {
        const teamsSnapshot = await getDocs(collection(db, "teams"));
        const availableOpponents = [];
        teamsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (!data.opponent && doc.id !== teamId) {
            availableOpponents.push({ id: doc.id, name: data.name || doc.id });
          }
        });
        setOpponents(availableOpponents);
      } catch (error) {
        console.error("Error fetching opponents: ", error);
      }
    };

    fetchTeam();
    fetchOpponents();
  }, [teamId]);

  const handleSave = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, {
        opponent: selectedOpponent || null,
      });

      if (selectedOpponent) {
        const opponentRef = doc(db, "teams", selectedOpponent);
        await updateDoc(opponentRef, { opponent: teamId });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

  const handleResetTimer = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, { startAt: serverTimestamp() });
    } catch (error) {
      console.error("Error resetting timer: ", error);
    }
  };

  const handleStartTimer = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, { timerStarted: true });
    } catch (error) {
      console.error("Error starting timer: ", error);
    }
  };

  const handleStopTimer = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, { timerStarted: false });
    } catch (error) {
      console.error("Error stopping timer: ", error);
    }
  };

  const handlePenalize = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, { isPenalized: true });
    } catch (error) {
      console.error("Error penalizing team: ", error);
    }
  };

  const handleRemovePenalty = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, { isPenalized: false });
    } catch (error) {
      console.error("Error removing penalty: ", error);
    }
  };

  const handleClearOpponent = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      await updateDoc(teamRef, { opponent: null });

      if (team?.opponent) {
        const opponentRef = doc(db, "teams", team.opponent);
        await updateDoc(opponentRef, { opponent: null });
      }
      setSelectedOpponent("");
    } catch (error) {
      console.error("Error clearing opponent: ", error);
    }
  };

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <section className="p-4 bg-gray-200 rounded-md max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">{team.name || team.id}</h1>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Preostalo vrijeme:</h4>
        <Timer startAt={team.startAt} timerStart={team.timerStarted} />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleResetTimer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset
          </button>
          <button
            onClick={handleStartTimer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start
          </button>
          <button
            onClick={handleStopTimer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Stop
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Protivnik:</h4>
        <select
          value={selectedOpponent}
          onChange={(e) => setSelectedOpponent(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 w-full"
        >
          <option value="">Nema protivnika</option>
          {opponents.map((opponent) => (
            <option key={opponent.id} value={opponent.id}>
              {opponent.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleClearOpponent}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Očisti protivnika
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={handlePenalize}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Penaliziraj
        </button>
        <button
          onClick={handleRemovePenalty}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Makni penal
        </button>
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full"
      >
        Spremi
      </button>
    </section>
  );
};

export default EditTeam;
