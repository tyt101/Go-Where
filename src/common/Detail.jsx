import React from "react";
import dayjs from "dayjs";
import "./Detail.css";
function format(d) {
  const date = dayjs(d);

  return date.format("MM-DD") + " " + date.locale("zh-cn").format("ddd");
}
export default function Detail(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStationStr,
    arriveStationStr,
    durationStr,
    trainNumberStr,
  } = props;
  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <p className="city">{departStationStr}</p>
          <p className="time">{departTimeStr}</p>
          <p className="date">{format(departDate)}</p>
        </div>
        <div className="middle">
          <p className="train-name">{trainNumberStr}</p>
          <p className="train-mid">{props.children}</p>
          <p className="train-time">耗时{durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{arriveStationStr}</p>
          <p className="time">{arriveTimeStr}</p>
          <p className="date">{format(arriveDate)}</p>
        </div>
      </div>
    </div>
  );
}
