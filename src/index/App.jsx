import React, { Fragment, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css'
import Header from '../common/Header'
import Journey from './Journey'
import CitySelector from '../common/CitySelector'
import SelectedDate from './SelectedDate'
import DateSelector from '../common/DateSelector'
import HighSpeed from './HighSpeed'
import Submit from './Submit'
// 引入action
import {
  exchangeFromTo,
  showCitySelector,
  hiddenCitySelector,
  setSelectedCity,
  fetchCityData,
  showDateSelector,
  hiddenDateSelector,
  setSelectedDate,
  toggleHighSpeed,
} from './actions'
import { h0 } from '../common/time'
function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
    selectedDate,
    isDateSelectorVisible,
    highSpeed,
    dispatch,
  } = props

  // > 返回上一步
  const onBack = useCallback(() => {
    window.history.back()
  },[])
  // 设置已选择的时间处理
  const onSelectedDate = useCallback((day) => {
    if(!day || day < h0()) return

    dispatch(setSelectedDate(day))
    dispatch(hiddenDateSelector())
  },[dispatch])

  // 将action和dispatch组合起来
  const journeyCbs = useMemo(() => {
    return bindActionCreators({
        exchangeFromTo,
        showCitySelector,
    },dispatch)
  },[dispatch])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack:hiddenCitySelector,
      onSelected:setSelectedCity,
      fetchCityData,
    },dispatch)
  },[dispatch])

  const selectedDateCbs = useMemo(() => {
    return bindActionCreators({
      showDateSelector,
    },dispatch)
  },[dispatch])

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hiddenDateSelector,
    },dispatch)
  },[dispatch])

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators({
      toggleHighSpeed,
    },dispatch)
  },[dispatch])

  return (
    <Fragment>
      <div className="header-wrapper">
        <Header title="趣家" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
          <Journey 
            from={from} 
            to={to} 
            {...journeyCbs}
          />
          <SelectedDate time={selectedDate} {...selectedDateCbs}/>
          <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
          <Submit />
        </form>
        <CitySelector 
          show={isCitySelectorVisible} 
          isLoading={isLoadingCityData}
          cityData={cityData}
          {...citySelectorCbs}
        />
        <DateSelector
          show={isDateSelectorVisible}
          {...dateSelectorCbs}
          onSelected={onSelectedDate}
        />
    </Fragment>
  )
}

export default connect(function mapStateToProps(state){
  return state
},function mapDispatchToProps(dispatch) {
  return {dispatch}
})(App)