import React, { useEffect, useState } from "react";
import "../styles/teamDash.css";
import { useNavigate } from "react-router";

const Timer = ({ title, seconds }) => {
  return (
    <div className="timerDash">
      <h4 className="">{title}</h4>
      <h2 className="">
        {Math.floor(seconds / 60)}:{seconds % 60 ? seconds % 60 : "00"}
      </h2>
    </div>
  );
};

const TeamDash = () => {
  const [teamData, setTeamData] = useState(null);
  const [secondsTeam, setSecondsTeam] = useState("15:00");
  const [secondsOpp, setSecondsOpp] = useState("15:00")
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("teamData");
    if (!storedData) {
      navigate("/teamLogin");
      return;
    }
    setTeamData(JSON.parse(storedData));
  }, [navigate]);

  if (!teamData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="teamDash">
      <h1 className="teamNameDash">{teamData.name}</h1>
      <hr />
      <article className="nextRivalTeamDash">
        <h4>Sljedeći protivnik:</h4>
        <h3 className="nextRivalNameDash">{teamData.opponent}</h3>
      </article>
      <hr />
      <Timer title="Preostalo vrijeme" seconds={secondsTeam} />
      <hr />
      <Timer title="Protivničko vrijeme" seconds={secondsOpp} />
      <hr />
      <button className="teamReadyButton">Spreman</button>
    </section>
  );
};

export default TeamDash;
