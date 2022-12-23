import React, { useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { h0 } from "../common/time";
import dayjs from "dayjs";
import URI from "urijs";
import Header from "../common/Header";
import Nav from "../common/Nav";
import List from "./List";
import Bottom from "./Bottom";
import useNav from "../common/useNav";
import {
  setFrom,
  setTo,
  setHighSpeed,
  setDepartDate,
  setSearchParsed,
  setTrainList,
  setTicketsType,
  setTrainsType,
  setDepartStations,
  setArriveStations,
  toggleHighSpeed,
  toggleIsFilterVisible,
  toggleOnlyTickets,
  toggleOrderType,
  setCheckedTrainsType,
  setCheckedTicketsType,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
  prevDate,
  nextDate,
} from "./actions";
import { bindActionCreators } from "redux";
function App(props) {
  const {
    from,
    to,
    searchParsed,
    departDate,
    trainList,

    highSpeed,
    orderType,
    onlyTickets,
    checkedTicketsType,
    checkedTrainsType,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,

    trainsType,
    ticketsType,
    departStations,
    arriveStations,
    isFilterVisible,

    dispatch,
  } = props;

  // 解析url
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from, to, date, highSpeed } = queries;

    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setHighSpeed(highSpeed === "true"));
    // 设置解析完成
    dispatch(setSearchParsed(true));
  }, [dispatch]);

  // 获取trainList
  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI("/rest/query")
      .setSearch("from", from)
      .setSearch("to", to)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("highSpeed", highSpeed)
      .setSearch("orderType", orderType)
      .setSearch("onlyTickets", onlyTickets)
      .setSearch("checkedTicketsType", Object.keys(checkedTicketsType).join())
      .setSearch("checkedTrainsType", Object.keys(checkedTrainsType).join())
      .setSearch(
        "checkedDepartStations",
        Object.keys(checkedDepartStations).join()
      )
      .setSearch(
        "checkedArriveStations",
        Object.keys(checkedArriveStations).join()
      )
      .setSearch("departTimeStart", departTimeStart)
      .setSearch("departTimeEnd", departTimeEnd)
      .setSearch("arriveTimeStart", arriveTimeStart)
      .setSearch("arriveTimeEnd", arriveTimeEnd)
      .toString();

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: { ticketType, trainType, depStation, arrStation },
            },
          },
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketsType(ticketType));
        dispatch(setTrainsType(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });
  }, [
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketsType,
    checkedTrainsType,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    dispatch,
  ]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // 获取底部传入回掉
  const BottomCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleHighSpeed,
        toggleIsFilterVisible,
        toggleOnlyTickets,
        toggleOrderType,
        setCheckedTrainsType,
        setCheckedTicketsType,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
        setHighSpeed,
      },
      dispatch
    );
  }, [dispatch]);

  const { prev, next, isPrevDisabled, isNextDisabled } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );

  if (!searchParsed) {
    return null;
  }
  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack}></Header>
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          prev={prev}
          next={next}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
        />
      </div>

      <List list={trainList} />
      <Bottom
        {...BottomCbs}
        isFilterVisible={isFilterVisible}
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        trainsType={trainsType}
        checkedTrainsType={checkedTrainsType}
        ticketsType={ticketsType}
        checkedTicketsType={checkedTicketsType}
        departStations={departStations}
        checkedDepartStations={checkedDepartStations}
        arriveStations={arriveStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
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
