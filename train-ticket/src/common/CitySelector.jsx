import React, { useMemo, useState, useEffect } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./CitySelector.css";

export default function CitySelector(props) {
  const { show, cityData, isLoading, onBack, fetchCityData } = props;
  // searchKey来存储搜索框的内容,默认值为空字符串，
  const [searchKey, setSearchKey] = useState("");
  // 去除输入框的空格
  const key = useMemo(() => searchKey.trim(), [searchKey]);
  // 发起异步请求
  useEffect(() => {
    // 显示城市模块，城市数据，已经在请求
    if (!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
  }, [show, cityData, isLoading]);

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
            value={searchKey}
            className="search-input"
            placeholder="请输入城市"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <i
          className={classnames("search-clean", {
            hidden: key.length === 0,
          })}
          onClick={() => setSearchKey("")}
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
  fetchCityData: PropTypes.func.isRequired,
};
