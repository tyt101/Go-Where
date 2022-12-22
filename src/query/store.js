
import { createStore,applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { h0 } from '../common/time'
import { orderEnumsType  } from "../common/Enum";
export default createStore(
  combineReducers(reducers)
,{
  // 始发点
  from:null,
  // 目的点
  to:null,
  // 始发时间
  departDate:h0(Date.now()),
  // 只看高铁动车
  highSpeed:false,
  // 火车列表
  trainList:[],
  // 排序方式:
  orderType:orderEnumsType.ORDER_DEPART,
  // 只看有票
  onlyTickets:false,
  // 票类型
  ticketsType:[],
  // 选中的票类型
  checkedTicketsType:{},
  // 火车类型
  trainsType:[],
  // 选中的火车类型
  checkedTrainsType:{},
  // 始发站
  departStations:[],
  // 选中的始发站
  checkedDepartStations:{},
  // 终点站
  arriveStations:[],
  // 选中的终点站
  checkedArriveStations:{},
  // 出发时间
  departTimeStart:0,
  departTimeEnd:24,
  // 到达时间
  arriveTimeStart:0,
  arriveTimeEnd:24,
  // 综合筛选是否可见
  isFilterVisible:false,
  // url解析完成
  searchParsed:false,

},applyMiddleware(thunk))