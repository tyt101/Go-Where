import {
  ACTION_SET_DEPART_DATE,
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_STATION_STR,
  ACTION_SET_ARRIVE_STATION_STR,
  ACTION_SET_TRAIN_NUMBER_STR,
  ACTION_SET_DURATION_TIME,
  ACTION_SET_PRICE,
  ACTION_SET_PASSENGERS,
  ACTION_SET_IS_MENU_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_SEAT_TYPE,
  ACTION_SET_MENU,
} from "./actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  departDate(state = Date.now(), actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_DEPART_DATE:
        return payload;
      default:
    }
    return state;
  },
  arriveDate(state = Date.now(), actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_ARRIVE_DATE:
        return payload;
      default:
    }
    return state;
  },
  departTimeStr(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_DEPART_TIME_STR:
        return payload;
      default:
    }
    return state;
  },
  arriveTimeStr(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_STR:
        return payload;
      default:
    }
    return state;
  },
  departStationStr(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_DEPART_STATION_STR:
        return payload;
      default:
    }
    return state;
  },
  arriveStationStr(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_ARRIVE_STATION_STR:
        return payload;
      default:
    }
    return state;
  },
  trainNumberStr(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_TRAIN_NUMBER_STR:
        return payload;
      default:
    }
    return state;
  },
  durationTime(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_DURATION_TIME:
        return payload;
      default:
    }
    return state;
  },
  price(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_PRICE:
        return payload;
      default:
    }
    return state;
  },
  passengers(state = [], actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_PASSENGERS:
        return payload;
      default:
    }
    return state;
  },
  isMenuVisible(state = [], actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_IS_MENU_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  searchParsed(state = [], actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_SEARCH_PARSED:
        return payload;
      default:
    }
    return state;
  },
  seatType(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_SEAT_TYPE:
        return payload;
      default:
    }
    return state;
  },
  menu(state = null, actions) {
    const { type, payload } = actions;
    switch (type) {
      case ACTION_SET_MENU:
        return payload;
      default:
    }
    return state;
  },
};
