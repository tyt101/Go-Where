import {
  createStore, combineReducers, applyMiddleware
} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk';

// createStore(reducers,initStates,enhancers)
export default createStore(
  combineReducers(reducers),
  {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    selectedDate: Date.now(),
    highSpeed: false,
  },
  applyMiddleware(thunk)
) 