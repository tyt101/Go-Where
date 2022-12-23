import React, { memo, useEffect, useState } from "react";
import URI from "urijs";
import dayjs from "dayjs";
import "./Schedule.css";
import classNames from "classnames";
import leftPad from "left-pad";
function Schedule(props) {
  const { date, trainNumberStr, departStationStr, arriveStationStr } = props;

  const [scheduleList, setScheduleList] = useState([]);
  useEffect(() => {
    const url = URI("/rest/schedule")
      .setSearch("trainNumberStr", trainNumberStr)
      .setSearch("departStationStr", departStationStr)
      .setSearch("arriveStationStr", arriveStationStr)
      .setSearch("date", dayjs(date).format("YYYY-MM-DD"))
      .toString();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let departStationRow;
        let arriveStationRow;
        for (let i = 0; i < data.length; i++) {
          if (!departStationRow) {
            if (data[i].station === departStationStr) {
              departStationRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: true,
                afterArriveStation: false,
                isArriveStation: false,
              });
            } else {
              Object.assign(data[i], {
                beforeDepartStation: true,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              });
            }
          } else if (!arriveStationRow) {
            if (data[i].station === arriveStationStr) {
              arriveStationRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: true,
              });
            } else {
              Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              });
            }
          } else {
            Object.assign(data[i], {
              beforeDepartStation: false,
              isDepartStation: false,
              afterArriveStation: true,
              isArriveStation: false,
            });
          }
          Object.assign(data[i], {
            isStartStation: i === 0,
            isEndStation: i === data.length - 1,
          });
        }
        setScheduleList(data);
      });
  }, [arriveStationStr, date, departStationStr, trainNumberStr]);
  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达</span>
          <span className="arrtime">发车</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return (
              <ScheduleItem
                key={schedule.station}
                {...schedule}
                index={index}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const ScheduleItem = memo(function ScheduleItem(props) {
  const {
    index,
    departTime,
    arriveTime,
    station,
    stay,

    isStartStation,
    isEndStation,

    beforeDepartStation,
    isDepartStation,
    afterArriveStation,
    isArriveStation,
  } = props;
  return (
    <li>
      <div
        className={classNames("icon", {
          "icon-red": isDepartStation || isArriveStation,
        })}
      >
        {isDepartStation ? "出" : isArriveStation ? "到" : leftPad(index, 2, 0)}
      </div>
      <div
        className={classNames("row", {
          grey: beforeDepartStation || afterArriveStation,
        })}
      >
        <span
          className={classNames("station", {
            red: isArriveStation || isDepartStation,
          })}
        >
          {station}
        </span>
        <span
          className={classNames("arrtime", {
            red: isArriveStation,
          })}
        >
          {isStartStation ? "始发站" : arriveTime}
        </span>
        <span
          className={classNames("deptime", {
            red: isDepartStation,
          })}
        >
          {isEndStation ? "终到站" : departTime}
        </span>
        <span className="stoptime">
          {isStartStation || isEndStation ? "-" : stay + "分"}
        </span>
      </div>
    </li>
  );
});

export default Schedule;
