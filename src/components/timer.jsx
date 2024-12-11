import React, { useState, useEffect } from "react";

const Timer = ({ startAt, timerStart, onNegative, textColor }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [timerStarted, setTimerStarted] = useState(true);

  useEffect(() => {
    if (!startAt || !timerStarted) return;

    const calculateTimeLeft = () => {
      const currentTime = Date.now();
      const startTime = new Date(startAt.seconds * 1000).getTime();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      const totalDuration = 15 * 60;
      const remainingTime = totalDuration - elapsed;

      const minutes = Math.floor(Math.abs(remainingTime) / 60);
      const seconds = Math.abs(remainingTime) % 60;

      const formattedTime = `${remainingTime < 0 ? "-" : ""}${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      setTimeLeft(formattedTime);

      if (remainingTime < 0 && onNegative) {
        onNegative();
      }
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [startAt, onNegative, timerStart]);

  return <span style={textColor && { color: textColor }}>{timeLeft}</span>;
};

export default Timer;
