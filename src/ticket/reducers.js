
import { 
  ACTION_SET_DEPART_DATE,
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_STATION_STR,
  ACTION_SET_ARRIVE_STATION_STR,
  ACTION_SET_TRAIN_NUMBER_STR,
  ACTION_SET_DURATION_STR,
  ACTION_SET_IS_SCHEDULE_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TICKETS,
 } from "./actions";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  departDate(state = Date.now(), actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DEPART_DATE:
        return payload
      default:
    }
    return state
  },
  arriveDate(state = new Date(), actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_ARRIVE_DATE:
        return payload
      default:
    }
    return state
  },
  departTimeStr(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DEPART_TIME_STR:
        return payload
      default:
    }
    return state
  },
  arriveTimeStr(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_STR:
        return payload
      default:
    }
    return state
  },
  departStationStr(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DEPART_STATION_STR:
        return payload
      default:
    }
    return state
  },
  arriveStationStr(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_ARRIVE_STATION_STR:
        return payload
      default:
    }
    return state
  },
  trainNumberStr(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_TRAIN_NUMBER_STR:
        return payload
      default:
    }
    return state
  },
  durationStr(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DURATION_STR:
        return payload
      default:
    }
    return state
  },
  isScheduleVisible(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_IS_SCHEDULE_VISIBLE:
        return payload
      default:
    }
    return state
  },
  searchParsed(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_SEARCH_PARSED:
        return payload
      default:
    }
    return state
  },
  tickets(state = null, actions){
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_TICKETS:
        return payload
      default:
    }
    return state
  }
}