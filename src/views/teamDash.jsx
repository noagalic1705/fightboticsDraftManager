import React, { useState } from "react";
import "../styles/teamDash.css";

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
  const [teamName, setTeamName] = useState("Ime tima");
  const [rivalTeamName, setRivalTeamName] = useState("Ime protivničkog tima");
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [secondsLeftRival, setSecondsLeftRival] = useState(20 * 60); //Sekunde su mi bile najlogicnije

  return (
    <section className="teamDash">
      <h1 className="teamNameDash">{teamName}</h1>
      <hr />
      <article className="nextRivalTeamDash">
        <h4>Sljedeći protivnik:</h4>
        <h3 className="nextRivalNameDash">{rivalTeamName}</h3>
      </article>
      <hr />
      <Timer title="Preostalo vrijeme" seconds={secondsLeft} />
      <hr />
      <Timer title="Protivničko vrijeme" seconds={secondsLeftRival} />
      <hr />
      <button className="teamReadyButton">Spreman</button>
    </section>
  );
};

export default TeamDash;
