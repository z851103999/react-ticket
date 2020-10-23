import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";

import Header from "../common/Header";
import DepartDate from "./DepartDate";
import HighSpeed from "./HighSpeed";
import Journey from "./Journey";
import Submit from "./Submit";

import CitySelector from "../common/CitySelector";

import {
  exchangeFromTo,
  showCitySelector,
  showDateSelector,
  hideCitySelector,
  setCityData,
  setDepartDate,
  toggleHightSpeed,
} from "./actions";

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityData,
    dispatch,
    cityData
  } = props;
  // 返回按钮
  const onBack = useCallback(() => {
    window.history.back();
  });
  // 发送到达和显示城市状态
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch
    );
  }, []);
  
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack:hideCitySelector
    },dispatch)
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey from={from} to={to} {...cbs} />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
