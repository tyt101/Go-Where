import React, { useEffect, useMemo } from 'react'
import Header from '../common/Header'
import Detail from '../common/Detail'
import Tickets from './Tickets'
import Passengers from './Passengers'
import Choose from './Choose'
import Menu from './Menu'
import Account from './Account'
import { connect } from 'react-redux'
import URI from 'urijs'
import {
  setDepartDate,
  serTrainNumberStr,
  setSeatType,
  setDepartStationStr,
  setArriveStationStr,
  setSearchParsed,
  setArriveDate,
  setArriveTimeStr,
  setDepartTimeStr,
  setPrice,
  createAdult,
  createChild,
  updatePassenger,
  showPassengersTypeMenu,
  showGenderTypeMenu,
  showFollowAdultMenu,
  hiddenMenu,
  removePassenger,
  setDurationTime
} from './actions'
import dayjs from 'dayjs'
import { bindActionCreators } from 'redux'
function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStationStr,
    arriveStationStr,
    trainNumberStr,
    durationTime,
    price,
    seatType,
    menu,
    passengers,
    isMenuVisible,
    searchParsed,
    dispatch,
  } = props
  const onBack = () => {
    window.history.back()
  }
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const {trainNumberStr, type, departStationStr, arriveStationStr, departDate} = queries
    dispatch(setDepartDate(dayjs(departDate).valueOf()))
    dispatch(serTrainNumberStr(trainNumberStr))
    dispatch(setSeatType(type))
    dispatch(setDepartStationStr(departStationStr))
    dispatch(setArriveStationStr(arriveStationStr))

    dispatch(setSearchParsed(true))
  })

  useEffect(() => {
    if (!searchParsed) {
        return;
    }

    const url = new URI('/rest/order')
      .setSearch('departStationStr', departStationStr)
      .setSearch('arriveStationStr', arriveStationStr)
      .setSearch('seatType', seatType)
      .setSearch('departDate', dayjs(departDate).format('YYYY-MM-DD'))
      .toString();
      
      fetch(url)
      .then(response => response.json())
      .then(data => {
        const {arriveDate, arriveTimeStr,departTimeStr,durationStr,price} = data
        dispatch(setArriveDate(dayjs(arriveDate).valueOf()))
        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveTimeStr(arriveTimeStr))
        dispatch(setDurationTime(durationStr))
        dispatch(setPrice(price))
      })
    }, [searchParsed, departStationStr, arriveStationStr, seatType, departDate, dispatch]
  );
  const PassengersCbs = useMemo(() => {
    return bindActionCreators({
      createAdult,
      createChild,
      updatePassenger,
      showPassengersTypeMenu,
      showGenderTypeMenu,
      showFollowAdultMenu,
      removePassenger,
    },dispatch)
  },[dispatch])

  const MenuCbs = useMemo(() => {
    return bindActionCreators({
      hiddenMenu,
    },dispatch)
  },[dispatch])

  const ChooseCbs = useMemo(() => {
    return bindActionCreators({
      updatePassenger,
    },dispatch)
  },[dispatch])

  const passengerLen = useMemo(() => {
    return passengers.length
  },[passengers])
  if(!searchParsed) return null

  const clientHeight = window.screen.availHeight
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
      </div>
      <div style={{height:parseInt(clientHeight)-104+'px', overflow:'scroll'}}>
        <div className="detail-wrapper">
          <Detail
              departDate={departDate}
              arriveDate={arriveDate}
              departTimeStr={departTimeStr}
              arriveTimeStr={arriveTimeStr}
              trainNumberStr={trainNumberStr}
              departStationStr={departStationStr}
              arriveStationStr={arriveStationStr}
              durationStr={durationTime}
          >
              <span
                  style={{ display: 'block' }}
                  className="train-icon"
              ></span>
          </Detail>

        </div>
        <Tickets seatType={seatType} price={price} />
        <Passengers passengers={passengers} {...PassengersCbs} />
        {
          passengers.length > 0 && <Choose passengers={passengers} {...ChooseCbs}/>
        }
        <Menu show={isMenuVisible} {...MenuCbs} {...menu} />
      </div>
      
      <Account passengerLen={passengerLen} price={price} />
    </div>
  )
}

export default connect(function mapStateToProps(state) {
  return state
},function mapDispatchToProps(dispatch) {
  return {dispatch}
})(App)
