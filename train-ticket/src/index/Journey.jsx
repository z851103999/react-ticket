import React from "react";
import "./Journey.css";
import switchImg from './imgs/switch.svg'

export default function DepartDate(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props;

  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
          <img src={switchImg} alt="switch" width="70" height="40" />
      </div>
      <div className="journey-station" onClick={()=>showCitySelector(false)}>
        <input type="text" readOnly name="to" value={to} className="journey-input journey-to"></input>
      </div>
    </div>
  );
}
