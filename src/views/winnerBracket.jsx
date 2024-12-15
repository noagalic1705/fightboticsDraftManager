import React from "react";
import Bracket from "../components/bracket";
import { useNavigate } from "react-router";

function WinnerBracket() {
  const navigate = useNavigate();
  
  const handleSwitchBracket = () => {
    navigate("/loserBracket");
  };
  return (
    <div className="bg-[#27272a]">
      <main className="p-4">
        <div className="flex justify-center text-6xl">
          <h1 className="font-bold text-gray-300" onClick={() => handleSwitchBracket()}>Winner's bracket</h1>
        </div>
        <Bracket isEdit={false} isWinner={true} />
      </main>
    </div>
  );
}

export default WinnerBracket;
