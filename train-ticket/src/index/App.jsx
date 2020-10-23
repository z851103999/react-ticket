import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";

import Header from "../common/Header";
import DepartDate from "./DepartDate";
import HighSpeed from "./HighSpeed";
import Journey from "./Journey";
import Submit from "./Submit";

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
  const { from, to, isCitySelectroyVisible, isDateSelectorVisible,dispatch } = props;
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

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey from={from} to={to} {...cbs} />
      </form>
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
