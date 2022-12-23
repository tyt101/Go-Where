export const SET_ACTION_FROM = "SET_FROM";
export const SET_ACTION_TO = "SET_TO";
export const SET_ACTION_IS_LOADING_CITY_DATA = "SET_IS_LOADING_CITY_DATA";
export const SET_ACTION_IS_CITY_SELECTOR_VISIBLE =
  "SET_IS_CITY_SELECTOR_VISIBLE";
export const SET_ACTION_CURRENT_SELECTING_LEFT_CITY =
  "SET_CURRENT_SELECTING_LEFT_CITY";
export const SET_ACTION_CITY_DATA = "SET_CITY_DATA";
export const SET_ACTION_IS_DATE_SELECTOR_VISIBLE =
  "SET_IS_DATE_SELECTOR_VISIBLE";
export const SET_ACTION_SELECTED_DATE = "SET_SELECTED_DATE";
export const SET_ACTION_HIGH_SPEED = "SET_HIGH_SPEED";

// 设置起始点
export function setFrom(form) {
  return {
    type: SET_ACTION_FROM,
    payload: form,
  };
}

// 设置目的地
export function setTo(to) {
  return {
    type: SET_ACTION_TO,
    payload: to,
  };
}

// 切换是否只看地铁
export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: SET_ACTION_HIGH_SPEED,
      payload: !highSpeed,
    });
  };
}

// 设置是否正在加载城市数据
export function setIsLoadingCityData(isLoadingCityDate) {
  return {
    type: SET_ACTION_IS_LOADING_CITY_DATA,
    payload: isLoadingCityDate,
  };
}

// 设置城市数据
export function setCityData(cityData) {
  return {
    type: SET_ACTION_CITY_DATA,
    payload: cityData,
  };
}

// 城市选择器

// 显示城市选择器
export function showCitySelector(currentSelectingLeftCity) {
  return (dispatch) => {
    dispatch({
      type: SET_ACTION_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    });
    dispatch({
      type: SET_ACTION_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    });
  };
}

// 隐藏城市选择器
export function hiddenCitySelector() {
  return {
    type: SET_ACTION_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  };
}

// 设置已选择的城市
export function setSelectedCity(selectedCity) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    if (currentSelectingLeftCity) dispatch(setFrom(selectedCity));
    else dispatch(setTo(selectedCity));

    dispatch(hiddenCitySelector());
  };
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setTo(from));
    dispatch(setFrom(to));
  };
}

// 异步获取城市选择数据
export function fetchCityData() {
  return (dispatch, getState) => {
    const { cityData, isLoadingCityDate } = getState();
    if (cityData || isLoadingCityDate) return;

    dispatch(setIsLoadingCityData(true));

    fetch("/rest/cities?_" + Date.now())
      .then((res) => res.json())
      .then((cityData) => {
        dispatch(setCityData(cityData));
      })
      .finally(() => {
        dispatch(setIsLoadingCityData(false));
      });
  };
}

// 时间选择器

// 显示时间选择器
export function showDateSelector() {
  return (dispatch) => {
    dispatch({
      type: SET_ACTION_IS_DATE_SELECTOR_VISIBLE,
      payload: true,
    });
  };
}

// 隐藏时间选择器
export function hiddenDateSelector() {
  return (dispatch) => {
    dispatch({
      type: SET_ACTION_IS_DATE_SELECTOR_VISIBLE,
      payload: false,
    });
  };
}

// 设置已选择的时间
export function setSelectedDate(selectedDate) {
  return {
    type: SET_ACTION_SELECTED_DATE,
    payload: selectedDate,
  };
}
