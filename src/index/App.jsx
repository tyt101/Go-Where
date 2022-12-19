import React, { Fragment, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css'
import Header from '../common/Header'
import Journey from './Journey'
import CitySelector from '../common/CitySelector'
// 引入action
import {
  exchangeFromTo,
  showCitySelector,
  hiddenCitySelector,
  setSelectedCity,
  fetchCityData,
} from './actions'
function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
    dispatch,
  } = props

  // > 返回上一步
  const onBack = useCallback(() => {
    window.history.back()
  },[])

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
        </form>
        <CitySelector 
          show={isCitySelectorVisible} 
          isLoading={isLoadingCityData}
          cityData={cityData}
          {...citySelectorCbs}
        />
    </Fragment>
  )
}

export default connect(function mapStateToProps(state){
  return state
},function mapDispatchToProps(dispatch) {
  return {dispatch}
})(App)