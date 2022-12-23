import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import URI from "urijs";
import Header from "../common/Header";
import Nav from "../common/Nav";
import Detail from "../common/Detail";
import useNav from "../common/useNav";
import dayjs from "dayjs";
import { h0 } from "../common/time";
import "./App.css";
import { TrainContext } from "./context";
import Candidates from "./Candidate";
import {
  setDepartDate,
  setArriveDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setDepartStationStr,
  setArriveStationStr,
  setTrainNumberStr,
  setDurationStr,
  toggleIsScheduleVisible,
  setSearchParsed,
  setTickets,
  prevDate,
  nextDate,
} from "./actions";
import { bindActionCreators } from "redux";

const Schedule = lazy(() => import("./Schedule.jsx"));
function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStationStr,
    arriveStationStr,
    trainNumberStr,
    durationStr,
    isScheduleVisible,
    searchParsed,
    tickets,
    dispatch,
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, trainNumber, date } = queries;
    dispatch(setDepartStationStr(dStation));
    dispatch(setArriveStationStr(aStation));
    dispatch(setTrainNumberStr(trainNumber));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));

    dispatch(setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI("/rest/ticket")
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("trainNumberStr", trainNumberStr)
      .toString();

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const { detail, candidates } = result;

        const { departTimeStr, arriveTimeStr, arriveDate, durationStr } =
          detail;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
  }, [searchParsed, departDate, trainNumberStr, dispatch]);

  const onBack = () => {
    window.history.back();
  };
  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );

  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible,
      },
      dispatch
    );
  }, [dispatch]);

  if (!searchParsed) return null;
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumberStr} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
      </div>
      <div className="detail-wrapper">
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          departStationStr={departStationStr}
          arriveStationStr={arriveStationStr}
          durationStr={durationStr}
          trainNumberStr={trainNumberStr}
        >
          <span className="left"></span>
          <span
            className="schedule"
            onClick={() => detailCbs.toggleIsScheduleVisible()}
          >
            时刻表
          </span>
          <span className="right"></span>
        </Detail>
      </div>
      {isScheduleVisible && (
        <div
          className="mask"
          onClick={() => dispatch(toggleIsScheduleVisible())}
        >
          <Suspense fallback={<div>loading</div>}>
            <Schedule
              date={departDate}
              trainNumberStr={trainNumberStr}
              departStationStr={departStationStr}
              arriveStationStr={arriveStationStr}
            />
          </Suspense>
        </div>
      )}
      <TrainContext.Provider
        value={{
          trainNumberStr,
          departStationStr,
          arriveStationStr,
          departDate,
        }}
      >
        <Candidates tickets={tickets} />
      </TrainContext.Provider>
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
