import React, { useEffect, useState } from "react";
import "../styles/teamDash.css";
import { useNavigate } from "react-router";
import Timer from "../components/timer";
import { doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfiguration";

const TimerFull = ({ title, seconds, timerStarted, isNegative, timerStopped, textColor }) => {
  return (
    <div className="timerDash ">
      <h4>{title}</h4>
      <h2>
        <Timer
          startAt={seconds}
          timerStart={timerStarted}
          onNegative={isNegative}
          timerStop={timerStopped}
          textColor={textColor}
        />
      </h2>
    </div>
  );
};

const TeamDash = () => {

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
      await updateDoc(teamRef, { isReady: true, timerStarted: false, timerStoppedAt: serverTimestamp() });
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

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
  
    const teamRef = doc(db, "teams", teamData.id);
  
    const unsubscribeTeam = onSnapshot(
      teamRef,
      async (teamSnapshot) => {
        const teamInfo = { id: teamSnapshot.id, ...teamSnapshot.data() };
        setTeam(teamInfo);
  
        if (teamInfo.opponent) {
          const opponentRef = doc(db, "teams", teamInfo.opponent);
          const unsubscribeOpponent = onSnapshot(
            opponentRef,
            (opponentSnapshot) => setOpponent({ id: opponentSnapshot.id, ...opponentSnapshot.data() }),
            (error) => console.error("Error fetching opponent data:", error)
          );
  
          return () => unsubscribeOpponent();
        } else {
          setOpponent(null);
        }
      },
      (error) => console.error("Error fetching team data:", error)
    );
  
    return () => unsubscribeTeam();
  }, [teamData]);

  if (!teamData || !team) {
    return <div>Loading...</div>;
  }

  return (
    <section className="teamDash">
      <h1 className="teamNameDash">{teamData.name}</h1>
      <hr />
      <article className="nextRivalTeamDash">
        <h4>Sljedeći protivnik:</h4>
        <h3 className="nextRivalNameDash">{team.opponent ? team.opponent : "TBA"}</h3>
      </article>
      <hr />
      <article
        className={
          team.isPenalized
            ? "red"
            : team.isReady
              ? "green"
              : isNegativeTeam
                ? "yellow"
                : ""
        }
      >
        <TimerFull
          title="Preostalo vrijeme"
          seconds={team.startAt}
          timerStarted={team.timerStarted}
          isNegative={handleNegativeTimeTeam}
          timerStopped={team.timerStoppedAt}
        />
      </article>

      <hr />
      {!opponent ?
        <div className="timerDash ">
          <h4>Protivničko vrijeme</h4>
          <h2>
            --:--
          </h2>
        </div>
        :
        <TimerFull
          title="Protivničko vrijeme"
          seconds={opponent.startAt}
          timerStarted={opponent.timerStarted}
          isNegative={handleNegativeTimeOpponent}
          timerStopped={opponent.timerStoppedAt}
          textColor={
            opponent.isPenalized
              ? "red"
              : opponent.isReady
                ? "green"
                : isNegativeOpponent
                  ? "yellow"
                  : ""
          }
        />}
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
