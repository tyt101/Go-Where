import { 
  ACTION_SET_FROM ,
  ACTION_SET_TO,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_TRAIN_LIST,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_TICKETS_TYPE,
  ACTION_SET_CHECKED_TICKETS_TYPE,
  ACTION_SET_TRAINS_TYPE,
  ACTION_SET_CHECKED_TRAINS_TYPE,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_CHECKED_DEPART_STATIONS,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_DEPART_TIME_START,
  ACTION_SET_DEPART_TIME_END,
  ACTION_SET_ARRIVE_TIME_START,
  ACTION_SET_ARRIVE_TIME_END,
  ACTION_SET_IS_FILTER_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
} from "./actions"
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  from(state = null, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_FROM:
        return payload;
      default:
    }
    return state
  },
  to(state = null, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_TO:
        return payload;
      default:
    }
    return state
  },
  departDate(state = Date.now(), actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DEPART_DATE:
        return payload;
      default:
    }
    return state
  },
  highSpeed(state = false, actions) {
    const {type, payload} = actions
    let checkedTrainsType;
    switch (type) {
      case ACTION_SET_HIGH_SPEED:
        return payload;
      case ACTION_SET_CHECKED_TRAINS_TYPE:
        checkedTrainsType = payload
        return Boolean(checkedTrainsType[1] && checkedTrainsType[5]);
      default:
    }
    return state
  },
  trainList(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_TRAIN_LIST:
        return payload;
      default:
    }
    return state
  },
  orderType(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_ORDER_TYPE:
        return payload;
      default:
    }
    return state
  },
  onlyTickets(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_ONLY_TICKETS:
        return payload;
      default:
    }
    return state
  },
  ticketsType(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_TICKETS_TYPE:
        return payload;
      default:
    }
    return state
  },
  checkedTicketsType(state = {}, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_CHECKED_TICKETS_TYPE:
        return payload;
      default:
    }
    return state
  },
  trainsType(state = {}, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_TRAINS_TYPE:
        return payload;
      default:
    }
    return state
  },
  checkedTrainsType(state = {}, actions) {
    const {type, payload} = actions
    let highSpeed;
    let newCheckedTrainTypes;
    switch (type) {
      case ACTION_SET_CHECKED_TRAINS_TYPE:
        return payload;
      case ACTION_SET_HIGH_SPEED:
        highSpeed = payload;
        newCheckedTrainTypes = { ...state };

        if (highSpeed) {
            newCheckedTrainTypes[1] = true;
            newCheckedTrainTypes[5] = true;
        } else {
            delete newCheckedTrainTypes[1];
            delete newCheckedTrainTypes[5];
        }

        return newCheckedTrainTypes;
      default:
    }
    return state
  },
  departStations(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DEPART_STATIONS:
        return payload;
      default:
    }
    return state
  },
  checkedDepartStations(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_CHECKED_DEPART_STATIONS:
        return payload;
      default:
    }
    return state
  },
  arriveStations(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case   ACTION_SET_ARRIVE_STATIONS:
        return payload;
      default:
    }
    return state
  },
  checkedArriveStations(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_CHECKED_ARRIVE_STATIONS:
        return payload;
      default:
    }
    return state
  },
  departTimeStart(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DEPART_TIME_START:
        return payload;
      default:
    }
    return state
  },
  departTimeEnd(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_DEPART_TIME_END:
        return payload;
      default:
    }
    return state
  },
  arriveTimeStart(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_START:
        return payload;
      default:
    }
    return state
  },
  arriveTimeEnd(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_END:
        return payload;
      default:
    }
    return state
  },
  isFilterVisible(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_IS_FILTER_VISIBLE:
        return payload;
      default:
    }
    return state
  },
  searchParsed(state = false, actions) {
    const {type, payload} = actions
    switch (type) {
      case ACTION_SET_SEARCH_PARSED:
        return payload;
      default:
    }
    return state
  },
}