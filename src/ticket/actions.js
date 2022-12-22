import { h0 } from "../common/time"

export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE'
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR'
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR'
export const ACTION_SET_DEPART_STATION_STR = 'SET_DEPART_STATION_STR'
export const ACTION_SET_ARRIVE_STATION_STR = 'SET_ARRIVE_STATION_STR'
export const ACTION_SET_TRAIN_NUMBER_STR = 'SET_TRAIN_NUMBER_STR'
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR'
export const ACTION_SET_IS_SCHEDULE_VISIBLE = 'SET_IS_SCHEDULE_VISIBLE'
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED'
export const ACTION_SET_TICKETS = 'SET_TICKETS'

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  }
}

export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate
  }
}

export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr
  }
}

export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr
  }
}

export function setDepartStationStr(departStationStr) {
  return {
    type: ACTION_SET_DEPART_STATION_STR,
    payload: departStationStr
  }
}

export function setArriveStationStr(arriveStationStr) {
  return {
    type: ACTION_SET_ARRIVE_STATION_STR,
    payload: arriveStationStr
  }
}

export function setTrainNumberStr(trainNumberStr) {
  return {
    type: ACTION_SET_TRAIN_NUMBER_STR,
    payload: trainNumberStr
  }
}

export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr
  }
}

export function toggleIsScheduleVisible() {
  return (dispatch, getState) => {
    const {isScheduleVisible} = getState()
    dispatch({
      type: ACTION_SET_IS_SCHEDULE_VISIBLE,
      payload: !isScheduleVisible
    })
  }
}

export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed
  }
}

export function setTickets(tickets) {
  return {
    type: ACTION_SET_TICKETS,
    payload: tickets
  }
}
export function nextDate() {
  return (dispatch, getState) => {
      const { departDate } = getState();

      dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
  };
}
export function prevDate() {
  return (dispatch, getState) => {
      const { departDate } = getState();

      dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
  };
}