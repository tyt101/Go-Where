import React, { memo } from "react";
import "./SelectedDate.css";
import dayjs from "dayjs";
import { h0 } from "../common/time";
import PropTypes from "prop-types";
const SelectedDate = memo(function SelectedDate(props) {
  const { time, showDateSelector } = props;

  const h0OfSelected = h0(time);
  const selectedDate = new Date(h0OfSelected);
  const selectedDateString = dayjs(h0OfSelected).format("YYYY-MM-DD");
  const isToday = h0OfSelected === h0();
  const weekString =
    "周" +
    ["日", "一", "二", "三", "四", "五", "六"][selectedDate.getDay()] +
    (isToday ? "(今天)" : "");
  return (
    <div className="selected-date" onClick={() => showDateSelector()}>
      <input type="hidden" name="date" value={selectedDateString} />
      {selectedDateString} <span className="selected-week">{weekString}</span>
    </div>
  );
});

SelectedDate.propTypes = {
  time: PropTypes.string.isRequired,
  showDateSelector: PropTypes.func.isRequired,
};
export default SelectedDate;
