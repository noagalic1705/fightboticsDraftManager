import React from "react";
import Bracket from "../components/bracket";
import { useNavigate } from "react-router";

function WinnerEdit() {
  const navigate = useNavigate();
  
  const handleSwitchBracket = () => {
    navigate("/loserEdit");
  };
  return (
    <div className="bg-[#27272a]">
      <main className="p-4">
        <div className="flex justify-center text-5xl">
          <h1 className="font-bold text-gray-300" onClick={() => handleSwitchBracket()}>Winner's bracket</h1>
        </div>
        <Bracket isEdit={true} isWinner={true} />
      </main>
    </div>
  );
}

export default WinnerEdit;
