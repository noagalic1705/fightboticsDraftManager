import React from "react";
import Bracket from "../components/bracket";
import { useNavigate } from "react-router";
import logo from "../images/notum.png";

function LoserBracket() {
  const navigate = useNavigate();

  const handleSwitchBracket = () => {
    navigate(`/winnerBracket`);
  };
  return (
    <div className="bg-[#27272a] min-h-screen">
      <main className="p-4">
        <div className="flex justify-center text-6xl">
          <h1 className="font-bold text-gray-300" onClick={() => handleSwitchBracket()}>
            Losers' bracket
          </h1>
        </div>
        <div className="flex justify-center my-1 items-center gap-2">
          <p className="text-gray-400">powered by </p>
          <img
            className="w-[3.5rem] h-[3.5rem] sm:w-[5rem] sm:h-[5rem] md:w-[6.4rem] md:h-[6.4rem] lg:w-[8rem] lg:h-[8rem] object-contain"
            src={logo}
            alt="Notum Robotics"
          />
        </div>
        <Bracket isEdit={false} isWinner={false} />
      </main>
    </div>
  );
}

export default LoserBracket;
