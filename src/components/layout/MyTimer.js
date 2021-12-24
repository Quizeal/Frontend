import React from "react";
import { useTimer } from "react-timer-hook";

export default function MyTimer({ expiryTimestamp, onExpire }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => onExpire(),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{ fontSize: "100px" }}
        className={`${minutes === 0 && seconds <= 5 && "danger-text"}`}
      >
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
