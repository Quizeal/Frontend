import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { setMyAlert } from "../../actions/myAlert";
import store from "../../store";

export default function MyTimer({ expiryTimestamp, onExpire }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => onExpire(),
  });

  const [alert, setAlert] = useState(false);
  if (minutes === 0 && seconds <= 15 && !alert) {
    setAlert(true);
    store.dispatch(
      setMyAlert("You only left 15 seconds to complete your quiz. Hurry up !!")
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{ fontSize: "50px" }}
        className={`${minutes === 0 && seconds <= 15 && "danger-text"}`}
      >
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
