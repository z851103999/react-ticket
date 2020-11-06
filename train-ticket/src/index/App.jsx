import React, {useCallback, useMemo} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "./App.css";
import "normalize.css";

import Header from "../common/Header";
import Journey from "./Journey";
import DepartDate from "./DepartDate";
import HighSpeed  from "./HighSpeed"
import Submit from './Submit'

import {h0} from "../common/fp";
import CitySelector from "../common/CitySelector";
import DateSelector from "../common/DateSelector";


import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
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
        cityData,
        isDateSelectorVisible,
        departDate,
        highSpeed
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

    // 显示日期浮层
    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);

    // 显示日期返回按钮
    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, []);

    // 点击日历日期
    const onSelectDate = useCallback((day) => {
        // 当前天是否为空
        if (!day) {
            return;
        }
        // 当前天是否为昨天，昨天不能选择
        if (day < h0) {
            return;
        }
        //传递日期 关闭浮层
        dispatch(setDepartDate(day))
        dispatch(hideDateSelector())
    }, []);

    // 点击动车按钮
    const highSpeedCbs = useMemo(()=>{
        return bindActionCreators({
            toggle:toggleHightSpeed
        },dispatch)
    },[])

    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack}/>
            </div>
            <form action="./query.html" className="form">
                <Journey from={from} to={to} {...cbs} />
                <DepartDate
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed
                    highSpeed={highSpeed}
                    {...highSpeedCbs}
                />
                <Submit />
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />
            <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
                onSelect={onSelectDate}
            />
        </div>
    );
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return {dispatch};
    }
)(App);
