import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";

import Header from "../common/Header";
import Journey from "./Journey";
import DepartDate from "./DepartDate";

import { h0 } from "../common/fp";
import CitySelector from "../common/CitySelector";

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
} from "./actions";

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityData,
    dispatch,
    cityData,
    departDate,
    isDateSelectorVisible,
  } = props;
  // 返回按钮
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  // 发送到达和显示城市状态
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch
    );
  }, [dispatch]);
  // 关闭城市选择浮层
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity,
      },
      dispatch
    );
  }, []);

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector,
      },
      dispatch
    );
  }, []);

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: hideDateSelector,
      },
      dispatch
    );
  }, []);

  const onSelectDate = useCallback((day) => {
    if (!day) {
      return;
    }
    if (day < h0) {
      return;
    }
    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate
          show={isDateSelectorVisible}
          {...departDateCbs}
          onSelect={onSelectDate}
        />
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
