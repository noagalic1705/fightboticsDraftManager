import React, { useEffect, useState } from "react";
import "../styles/teamDash.css";
import { useNavigate } from "react-router";
import Timer from "../components/timer";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfiguration";

const TimerFull = ({ title, seconds, timerStarted, isNegative, textColor }) => {
  return (
    <div className="timerDash ">
      <h4>{title}</h4>
      <h2>
        <Timer
          startAt={seconds}
          timerStart={timerStarted}
          onNegative={isNegative}
          textColor={textColor}
        />
      </h2>
    </div>
  );
};

const TeamDash = () => {
  const mockStartAt = { seconds: Math.floor(Date.now() / 1000) - 800 }; // AKO TREBA ZA TEST

  const [isNegativeTeam, setIsNegativeTeam] = useState(false);
  const [isNegativeOpponent, setIsNegativeOpponent] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [team, setTeam] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const navigate = useNavigate();

  const handleNegativeTimeTeam = () => {
    setIsNegativeTeam(true);
  };

  const handleNegativeTimeOpponent = () => {
    setIsNegativeOpponent(true);
  };
  const handleReady = async (e) => {
    e.preventDefault();
    try {
      const teamRef = doc(db, "teams", team.id);
      await updateDoc(teamRef, {
        isReady: true,
      });
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

  console.log(team);

  useEffect(() => {
    const storedData = localStorage.getItem("teamData");
    if (!storedData) {
      navigate("/teamLogin");
      return;
    }
    setTeamData(JSON.parse(storedData));
  }, [navigate]);

  useEffect(() => {
    if (!teamData) return;

    const fetchTeams = async () => {
      try {
        const teamsSnapshot = await getDocs(collection(db, "teams"));
        teamsSnapshot.forEach((doc) => {
          if (doc.id === teamData.id) {
            setTeam({ id: doc.id, ...doc.data() });
          } else if (doc.id === teamData.opponent) {
            setOpponent({ id: doc.id, ...doc.data() });
          }
        });
      } catch (error) {
        console.error("Error fetching teams: ", error);
      }
    };

    fetchTeams();
  }, [teamData]);

  if (!teamData || !team || !opponent) {
    return <div>Loading...</div>;
  }

  return (
    <section className="teamDash">
      <h1 className="teamNameDash">{teamData.name}</h1>
      <hr />
      <article className="nextRivalTeamDash">
        <h4>Sljedeći protivnik:</h4>
        <h3 className="nextRivalNameDash">{team.opponent ?? "TBA"}</h3>
      </article>
      <hr />
      <article
        className={
          isNegativeTeam
            ? "yellow"
            : team.isReady
            ? "green"
            : team.isPenalized
            ? "red"
            : ""
        }
      >
        <TimerFull
          title="Preostalo vrijeme"
          seconds={team.startAt}
          timerStarted={team.timerStarted}
          isNegative={handleNegativeTimeTeam}
        />
      </article>

      <hr />
      <TimerFull
        title="Protivničko vrijeme"
        seconds={opponent.startAt}
        timerStarted={opponent.timerStarted}
        isNegative={handleNegativeTimeOpponent}
        textColor={
          isNegativeOpponent
            ? "yellow"
            : opponent.isReady
            ? "green"
            : opponent.isPenalized
            ? "red"
            : ""
        }
      />
      <hr />
      <button
        className={"teamReadyButton"}
        style={{ background: team.isReady && "#7f5af0" }} //Ovo si pogledaj jel oćeš ovu boju, ćisto da se nekak vidi da je kliknuto, nisam siguran koji bi drugi tekst stavil
        onClick={(e) => handleReady(e)}
      >
        Spreman
      </button>
    </section>
  );
};

export default TeamDash;
