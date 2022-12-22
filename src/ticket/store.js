import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from './reducers'

import thunk from "redux-thunk";

export default createStore(
  combineReducers(reducers),
  {
    departDate:Date.now(),
    arriveDate:Date.now(),
    departTimeStr:null,
    arriveTimeStr:null,
    departStationStr:null,
    arriveStationStr:null,
    trainNumberStr:null,
    durationStr:null,
    isScheduleVisible:false,
    searchParsed:false,
    tickets:[]
  },
  applyMiddleware(thunk)
)