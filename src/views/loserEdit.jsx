import React from "react";
import Bracket from "../components/bracket";
import { useNavigate } from "react-router";

function LoserEdit() {
  const navigate = useNavigate();
  
  const handleSwitchBracket = () => {
    navigate("/winnerEdit");
  };
  return (
    <div className="bg-[#27272a]">
      <main className="p-4">
        <div className="flex justify-center text-5xl">
          <h1 className="font-bold text-gray-300" onClick={() => handleSwitchBracket()}>Loser's bracket</h1>
        </div>
        <Bracket isEdit={true} isWinner={false} />
      </main>
    </div>
  );
}

export default LoserEdit;
