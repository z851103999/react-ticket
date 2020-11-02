// 日历模块
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./DateSelector.css";
import {h0} from "./fp";

import Header from "./Header";

export default function DateSelector(props) {
    // show:bool显示，onSelect选择日期，onBack返回按钮
    const {show, onSelect, onBack } = props;
    console.log(onSelect)
    // 重置时间为当前月份1号
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);
// 获取这个月
    const monthSequence = [now.getTime()];
    now.setMonth(now.getMonth() + 1);
// 在这个月 + 1
    monthSequence.push(now.getTime());

    now.setMonth(now.getMonth() + 1);
// 未来3个月日历表
    monthSequence.push(now.getTime());
// console.log(monthSequence)

    return (
        <div className={classnames("date-selector", {hidden: !show})}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {monthSequence.map((month) => {
                    return (
                        <Month
                            key={month}
                            onSelect={onSelect}
                            startingTimeInMonth={month}
                        />
                    );
                })}
            </div>
        </div>
    );
}

DateSelector.prototype = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

// 日历标题
function Month(props) {
// 当前天的0时刻
    const {startingTimeInMonth, onSelect} = props;
// 递增Day
// 开始day
    const startDay = new Date(startingTimeInMonth);
// 指针day
    const currentDay = new Date(startingTimeInMonth);

    let days = [];
// 把遍历值放入到 days 一个月份
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }
// 获取到星期几 如果是星期日的话，我们补齐6个 填入没有意义null   日历头部补齐操作
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null)
        .concat(days);
// 获取到最后一天，day数组最后一位
    const lastDay = new Date(days[days.length - 1]);
// 计算补齐长度 不是星期日 用7-减去值  如果是星期日咎不用补齐
    days = days.concat(
        new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
    );
// 周为单位进行分组
    const weeks = [];
// 行数 0 个数7整除
    for (let row = 0; row < days.length / 7; ++row) {
        // 计算起点和终点 分割到一段数组里
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }

    return (
        <table className="date-table">
            <thead>
            <tr>
                <td colSpan="7">
                    <h5>
                        {startDay.getFullYear()}年{startDay.getMonth() + 1} 月
                    </h5>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr className="data-table-weeks">
                <th>周一</th>
                <th>周二</th>
                <th>周三</th>
                <th>周四</th>
                <th>周五</th>
                <th className="weekend">周六</th>
                <th className="weekend">周日</th>
            </tr>
            {weeks.map((week, idx) => {
                return <Week key={idx} days={week} onSelect={onSelect}/>;
            })}
            </tbody>
        </table>
    );
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

// 周组件
function Week(props) {
    const {days, onSelect} = props;

    return (
        <tr className="date-table-days">
            {days.map((day, idx) => {
                return <Day key={idx} day={day} onSelect={onSelect}/>;
            })}
        </tr>
    );
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

// 日历每一天
function Day(props) {
    const {day, onSelect} = props;
// 判断day是否为null空
    if (!day) {
        return <td className="null"></td>;
    }

    const classes = [];

    const now = h0();
// 这个值是过去
    if (day < now) {
        classes.push("disabled");
    }
// 判断是为星期几
    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push("weekend");
    }
// 判断是否是今天
    const dateString = now === day ? "今天" : new Date(day).getDate();
    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            {dateString}
        </td>
    );
}

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};
