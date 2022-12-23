import classNames from 'classnames';
import React, { memo, useMemo, useReducer, useState } from 'react'
import {orderEnumsType} from '../common/Enum'
import PropTypes from 'prop-types'
import Slider from './Slider';
import './Bottom.css'
const Bottom = memo(function Bottom(props) {
  const {
    // actions
    toggleHighSpeed,
    toggleIsFilterVisible,
    toggleOnlyTickets,
    toggleOrderType,
    setCheckedTrainsType,
    setCheckedTicketsType,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    setHighSpeed,
    // states
    isFilterVisible,
    highSpeed,
    orderType,
    onlyTickets,
    trainsType,
    checkedTrainsType,
    ticketsType,
    checkedTicketsType,
    departStations,
    checkedDepartStations,
    arriveStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  } = props

  const noChecked = useMemo(() => {
    if(
      Object.keys(checkedTrainsType).length === 0 &&
      Object.keys(checkedTicketsType).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStations).length === 0 &&
      departTimeStart === 0 && departTimeEnd === 24 &&
      arriveTimeStart === 0 && arriveTimeEnd === 24
    )
    return true
    return false
  },[arriveTimeEnd, arriveTimeStart, checkedArriveStations, checkedDepartStations, checkedTicketsType, checkedTrainsType, departTimeEnd, departTimeStart])
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className='item' onClick={() => !isFilterVisible && toggleOrderType()}>
          <i className="icon">&#xf065;</i>
          {orderType === orderEnumsType.ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
        </span>
        <span 
            className={classNames('item',{
              'item-on': highSpeed
            })}
            onClick={() => !isFilterVisible && toggleHighSpeed()}
          >
          <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁动车
        </span>
        <span 
            className={classNames('item', {
              'item-on':onlyTickets
            })}
            onClick={() => !isFilterVisible && toggleOnlyTickets()}
          >
          <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span 
            className={classNames('item',{
              'item-on':!noChecked || isFilterVisible
            })}
            onClick={() => toggleIsFilterVisible()}
          >
          <i className="icon">{noChecked ? '\uf0f7' : '\uf446'}</i>
          综合筛选
        </span>
      </div>
      {
          isFilterVisible && (
            <BottomModal 
              trainsType={trainsType}
              ticketsType={ticketsType}
              departStations={departStations}
              arriveStations={arriveStations}
              departTimeStart={departTimeStart}
              departTimeEnd={departTimeEnd}
              arriveTimeStart={arriveTimeStart}
              arriveTimeEnd={arriveTimeEnd}
              checkedTrainsType={checkedTrainsType}
              checkedTicketsType={checkedTicketsType}
              checkedDepartStations={checkedDepartStations}
              checkedArriveStations={checkedArriveStations}

              setCheckedTrainsType={setCheckedTrainsType}
              setCheckedTicketsType={setCheckedTicketsType}
              setCheckedDepartStations={setCheckedDepartStations}
              setCheckedArriveStations={setCheckedArriveStations}
              setDepartTimeStart={setDepartTimeStart}
              setDepartTimeEnd={setDepartTimeEnd}
              setArriveTimeStart={setArriveTimeStart}
              setArriveTimeEnd={setArriveTimeEnd}
              setHighSpeed={setHighSpeed}
              toggleIsFilterVisible={toggleIsFilterVisible}

            />
          )
        }
    </div>
  );
})
Bottom.propTypes = {
  // actions
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleIsFilterVisible: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  setCheckedTrainsType: PropTypes.func.isRequired,
  setCheckedTicketsType: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  setHighSpeed: PropTypes.func.isRequired,
  // states
  isFilterVisible: PropTypes.bool.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  orderType: PropTypes.number.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  trainsType: PropTypes.array.isRequired,
  checkedTrainsType: PropTypes.object.isRequired,
  ticketsType: PropTypes.array.isRequired,
  checkedTicketsType: PropTypes.object.isRequired,
  departStations: PropTypes.array.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
}
function checkedReducer(state, actions) {
  const {type, payload} = actions
  let newState;
  switch (type) {
    case 'toggle':
      newState = {...state}
      if(payload in newState) {
        delete newState[payload]
      }else {
        newState[payload] = true
      }
      return newState
    case 'reset':
      return {}
    default:
  }
  return state
}

const BottomModal = memo(function BottomModal(props) {
  const {
    // states
    trainsType,
    ticketsType,
    departStations,
    arriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    checkedTrainsType,
    checkedTicketsType,
    checkedDepartStations,
    checkedArriveStations,

    // actions
    setCheckedTrainsType,
    setCheckedTicketsType,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    setHighSpeed,
    toggleIsFilterVisible,
    // 
  } = props

  const [checkedTrainTypeOptions, setCheckedTrainTypeOptions] = useReducer(
    checkedReducer,
    checkedTrainsType,
    (checkedTrainsType) => {
      return checkedTrainsType
    })
  const [checkedTicketsTypeOptions, setCheckedTicketsTypeOptions] = useReducer(
    checkedReducer,
    checkedTicketsType,
    (checkedTicketsType) => {
      return checkedTicketsType
    }
  )
  const [checkedDepartStationsOptions, setCheckedDepartStationsOptions] = useReducer(
    checkedReducer,
    checkedDepartStations,
    (checkedDepartStations) => {
      return checkedDepartStations
    }
  )
  const [checkedArriveStationsOptions, setCheckedArriveStationsOptions] = useReducer(
    checkedReducer,
    checkedArriveStations,
    (checkedArriveStations) => {
      return checkedArriveStations
    }
  )
  const [checkedDepartTimeStart,setCheckedDepartTimeStart] = useState(departTimeStart)
  const [checkedDepartTimeEnd,setCheckedDepartTimeEnd] = useState(departTimeEnd)
  const [checkedArriveTimeStart,setCheckedArriveTimeStart] = useState(arriveTimeStart)
  const [checkedArriveTimeEnd,setCheckedArriveTimeEnd] = useState(arriveTimeEnd)




  const optionGroup = [{
    title: '坐席类型',
    options: ticketsType,
    checkedOptions: checkedTicketsTypeOptions,
    dispatch:setCheckedTicketsTypeOptions
  },{
    title: '车次类型',
    options: trainsType,
    checkedOptions: checkedTrainTypeOptions,
    dispatch: setCheckedTrainTypeOptions
  },{
    title: '出发车站',
    options: departStations,
    checkedOptions: checkedDepartStationsOptions,
    dispatch: setCheckedDepartStationsOptions
  },{
    title: '到达车站',
    options: arriveStations,
    checkedOptions: checkedArriveStationsOptions,
    dispatch: setCheckedArriveStationsOptions
  }]

  const resetDisabled = useMemo(() => {
    return Object.keys(checkedTrainTypeOptions).length === 0 &&
           Object.keys(checkedTicketsTypeOptions).length === 0 &&
           Object.keys(checkedDepartStationsOptions).length === 0 &&
           Object.keys(checkedArriveStationsOptions).length === 0 &&
           checkedDepartTimeStart === 0 && checkedDepartTimeEnd === 24 &&
           checkedArriveTimeStart === 0 && checkedArriveTimeEnd ===24

  },[checkedTrainTypeOptions, checkedTicketsTypeOptions, checkedDepartStationsOptions, checkedArriveStationsOptions, checkedDepartTimeStart, checkedDepartTimeEnd, checkedArriveTimeStart, checkedArriveTimeEnd])

  const reset = () => {
    if(resetDisabled) return
    setCheckedTrainTypeOptions({type: 'reset'})
    setCheckedTicketsTypeOptions({type: 'reset'})
    setCheckedDepartStationsOptions({type: 'reset'})
    setCheckedArriveStationsOptions({type: 'reset'})
    
    setCheckedDepartTimeStart(0)
    setCheckedDepartTimeEnd(24)
    setCheckedArriveTimeStart(0)
    setCheckedArriveTimeEnd(24)

    setHighSpeed(false)
  }
  const onConfirmFilter = () => {
    setCheckedTrainsType(checkedTrainTypeOptions)
    setCheckedTicketsType(checkedTicketsTypeOptions)
    setCheckedDepartStations(checkedDepartStationsOptions)
    setCheckedArriveStations(checkedArriveStationsOptions)

    setDepartTimeStart(checkedDepartTimeStart)
    setDepartTimeEnd(checkedDepartTimeEnd)
    setArriveTimeStart(checkedArriveTimeStart)
    setArriveTimeEnd(checkedArriveTimeEnd)

    toggleIsFilterVisible()
  }

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span 
              className={classNames({'disabled':resetDisabled})}
              onClick = {() => reset()}
            >
              重置
            </span>
            <span onClick={() => onConfirmFilter()}>
              确认
            </span>
          </div>
          <div className="options">
            {
              optionGroup.map(option => {
                return <Option key={option.title} {...option} />
              })
            }
          </div>
          <Slider 
            title="出发时间" 
            start={checkedDepartTimeStart} 
            end={checkedDepartTimeEnd} 
            onStartChange={setCheckedDepartTimeStart}
            onEndChange={setCheckedDepartTimeEnd}
          />
          <Slider 
            title="到达时间" 
            start={checkedArriveTimeStart} 
            end={checkedArriveTimeEnd} 
            onStartChange={setCheckedArriveTimeStart}
            onEndChange={setCheckedArriveTimeEnd}
          />
        </div>
      </div>
    </div>
  )
})

BottomModal.propTypes = {
  // states
  trainsType: PropTypes.array.isRequired,
  ticketsType: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  checkedTrainsType: PropTypes.object.isRequired,
  checkedTicketsType: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,

  // actions
  setCheckedTrainsType: PropTypes.func.isRequired,
  setCheckedTicketsType: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  setHighSpeed: PropTypes.func.isRequired,
  toggleIsFilterVisible: PropTypes.func.isRequired,
}
const Option = memo(function Option(props) {
  const {title,options,checkedOptions,dispatch} = props

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map(option => {
            return <Filter 
                    key={option.value} 
                    {...option} 
                    checked={option.value in checkedOptions}  
                    dispatch={dispatch}
            />
          })
        }
      </ul>
    </div>
  )
})

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedOptions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
const Filter = memo(function Filter(props) {
  const {value, name, checked, dispatch} = props

  return (
    <li 
      className={classNames({ checked })}
      onClick={() => dispatch({payload: value, type: 'toggle'})}
    >
      { name }
    </li>
  )
})
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}
export default Bottom