import {
  SET_ACTION_FROM,
  SET_ACTION_TO,
  SET_ACTION_IS_LOADING_CITY_DATA,
  SET_ACTION_IS_CITY_SELECTOR_VISIBLE,
  SET_ACTION_CURRENT_SELECTING_LEFT_CITY,
  SET_ACTION_IS_DATE_SELECTOR_VISIBLE,
  SET_ACTION_SELECTED_DATE,
  SET_ACTION_HIGH_SPEED,
  SET_ACTION_CITY_DATA,
} from "./actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  from(state = "北京", action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_FROM:
        return payload;
      default:
    }
    return state;
  },
  to(state = "上海", action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_TO:
        return payload;
      default:
    }
    return state;
  },
  isLoadingCityData(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_IS_LOADING_CITY_DATA:
        return payload;
      default:
    }
    return state;
  },
  isCitySelectorVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_IS_CITY_SELECTOR_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  currentSelectingLeftCity(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_CURRENT_SELECTING_LEFT_CITY:
        return payload;
      default:
    }
    return state;
  },
  isDateSelectorVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_IS_DATE_SELECTOR_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  cityData(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_CITY_DATA:
        return payload;
      default:
    }
    return state;
  },
  selectedDate(state = Date.now(), action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_SELECTED_DATE:
        return payload;
      default:
    }
    return state;
  },
  highSpeed(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ACTION_HIGH_SPEED:
        return payload;
      default:
    }
    return state;
  },
};
