import React from "react";
import "./Journey.css";
import switchImg from "./imgs/switch.svg";

export default function DepartDate(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props;

  return (
    <div className="journey">
      {/* 起始地 */}
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      {/* 切换城市 */}
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} alt="switch" width="70" height="40" />
      </div>
      {/* 到达地 */}
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
         />
      </div>
    </div>
  );
}
