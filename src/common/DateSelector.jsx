import React, { memo } from "react";
import "./DateSelector.css";
import classNames from "classnames";
import Header from "./Header";
import { h0, h1 } from "../common/time";
import PropTypes from "prop-types";
const Day = memo(function Day(props) {
  const { day, onSelected } = props;

  if (!day) {
    return <td className="null"></td>;
  }

  const classes = [];

  const now = h0();

  if (day < now) {
    classes.push("disabled");
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push("weekend");
  }

  const dateString = now === day ? "今天" : new Date(day).getDate();

  return (
    <td className={classNames(classes)} onClick={() => onSelected(day)}>
      {dateString}
    </td>
  );
});
Day.propTypes = {
  day: PropTypes.number,
  onSelected: PropTypes.func.isRequired,
};
const Week = memo(function Week(props) {
  const { days, onSelected } = props;
  return (
    <tr>
      {days.map((day, index) => {
        return <Day key={index} day={day} onSelected={onSelected}></Day>;
      })}
    </tr>
  );
});
Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
};
const Month = memo(function Month(props) {
  const { startingTimeInMonth, onSelected } = props;
  const startDay = new Date(startingTimeInMonth);
  const curDay = new Date(startingTimeInMonth);

  let days = [];
  while (startDay.getMonth() === curDay.getMonth()) {
    days.push(curDay.getTime());
    curDay.setDate(curDay.getDate() + 1);
  }
  // 每月第一天前追加null
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 0)
    .fill(null)
    .concat(days);
  // 每月最后一天后追加null
  const endDay = new Date(days[days.length - 1]);
  days = days.concat(new Array(endDay.getDate() ? 0 : 7 - endDay.getDate()));

  // 周
  const weeks = [];
  for (let i = 0; i < days.length / 7; i++) {
    const week = days.slice(i * 7, (i + 1) * 7);
    weeks.push(week);
  }
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan={7}>
            {startDay.getFullYear()}年{startDay.getMonth() + 1}月
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
        {weeks.map((week) => {
          return <Week key={week} days={week} onSelected={onSelected} />;
        })}
      </tbody>
    </table>
  );
});
Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelected: PropTypes.func.isRequired,
};
const DateSelector = memo(function DateSelector(props) {
  const { show, onBack, onSelected } = props;

  const now = h1();
  // 放入三个月的开始时间戳
  const monthSequence = [now.getTime()];
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());
  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());
  return (
    <div className={classNames("date-selector", { hidden: !show })}>
      <Header title="日期选择" onBack={() => onBack()} />
      <div className="date-selector-tables">
        {monthSequence.map((month) => {
          return (
            <Month
              key={month}
              startingTimeInMonth={month}
              onSelected={onSelected}
            />
          );
        })}
      </div>
    </div>
  );
});

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
};
export default DateSelector;
