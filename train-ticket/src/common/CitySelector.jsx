import React, { useMemo, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./CitySelector.css";

export default function CitySelector(props) {
  const { show, cityData, isLoading, onBack } = props;

  const [serchKey, setSearchKey] = useState("");

  const key = useMemo(() => serchKey.trim(), [serchKey]);

  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={serchKey}
            className="search-input"
            placeholder="请输入城市"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <i
          className={classnames('search-clean', {
            hidden: key.length === 0
          })}
          onClick={() => setSearchKey('')}
        >
          &#xf063;
        </i>
      </div>
    </div>
  );
}

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
};
