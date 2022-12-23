import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from './reducers'

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
    durationTime:null,
    price:0,
    seatType:null,
    menu:null,
    passengers:[],
    isMenuVisible:false,
    searchParsed:false
  },
  applyMiddleware(thunk)
)