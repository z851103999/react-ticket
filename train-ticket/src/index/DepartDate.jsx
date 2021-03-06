import React, { useMemo } from "react";
import "./DepartDate.css";
import { h0 } from "../common/fp";
import * as dayjs from "dayjs";
import PropTypes from "prop-types";

export default function DepartDate(props) {
  const { time, onClick } = props;
  // 初始日期 零时零分零秒
  const h0OfDepart = h0(time);
  // 时间格式转换
  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format("YYYY-MM-DD");
  }, [h0OfDepart]);

  const departDate = new Date(h0OfDepart);

  const isToday = h0OfDepart === h0();

  const weekString =
    "周" +
    ["日", "一", "二", "三", "四", "五", "六"][departDate.getDay()] +
    (isToday ? "(今天)" : "");

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString} />
      {
        departDateString
      }
      <span className="depart-week">{weekString}</span>
    </div>
  );
}

DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
