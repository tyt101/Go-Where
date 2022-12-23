import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './Passengers.css'
const Passenger = memo(function Passenger(props) {
  const {
    id,
    name,
    credit,
    birthday,
    gender,
    ticketType,
    followAdultName,
    updatePassenger,
    showPassengersTypeMenu,
    showGenderTypeMenu,
    showFollowAdultMenu,
    removePassenger,
  } = props

  const isAdult = ticketType === 'Adult';

  return (
    <li className="passenger">
      <i className="delete" onClick={() => removePassenger(id)}>
          —
      </i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label>
          <input
            type="text"
            className="input name"
            placeholder="乘客姓名"
            value={name}
            onChange={(e) => updatePassenger(id,{name: e.target.value})}
          />
          <label
              className="ticket-type"
              onClick={() => showPassengersTypeMenu(id)}
          >
            {isAdult ? '成人票' : '儿童票'}
          </label>
        </li>
        {isAdult && (
          <li className="item">
              <label className="label licenceNo">身份证</label>
              <input
                type="text"
                className="input licenceNo"
                placeholder="证件号码"
                value={credit}
                onChange={(e) => updatePassenger(id,{credit:e.target.value})}
              />
          </li>
        )}
        {
          !isAdult && (
            <li className="item">
              <label className="label gender">性别</label>
              <input
                type="text"
                className="input gender"
                placeholder="性别"
                value={gender === 'male' ? '男' : gender === 'female' ? '女' : ''}
                readOnly
                onClick={() => showGenderTypeMenu(id)}
              />
          </li>
          )
        }
        {
          !isAdult && (
            <li className="item">
              <label className="label birthday">出生日期</label>
              <input
                type="text"
                className="input birthday"
                placeholder="出生日期"
                value={birthday}
                onChange={(e) => updatePassenger(id,{birthday:e.target.value})}
              />
          </li>
          )
        }
        {
          !isAdult && (
            <li className="item">
              <label className="label followAdultName">同行成人</label>
              <input
                type="text"
                className="input followAdultName"
                placeholder="同行成人"
                value={followAdultName}
                readOnly
                onClick={() => showFollowAdultMenu(id)}
              />
          </li>
          )
        }
      </ol>
    </li>
  )
})
Passenger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  credit: PropTypes.string,
  birthday: PropTypes.string,
  gender: PropTypes.string,
  ticketType: PropTypes.string.isRequired,
  followAdultName: PropTypes.string,
  updatePassenger: PropTypes.func.isRequired,
  showPassengersTypeMenu: PropTypes.func.isRequired,
  showGenderTypeMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
  removePassenger: PropTypes.func.isRequired,
}
const Passengers = memo(function Passengers(props) {
  const {
    passengers,
    showPassengersTypeMenu,
    showGenderTypeMenu,
    showFollowAdultMenu,
    removePassenger,
    createAdult,
    createChild,
    updatePassenger
  } = props

  const followAdultName = (followAdultId) => {
    for(let passenger of passengers) {
      if(passenger.id === followAdultId)
        return passenger.name
    }
  }
  return (
    <div className="passengers">
      <ul>
        {
          passengers.map(passenger => {
            return <Passenger 
            key={passenger.id} 
            {...passenger} 
            updatePassenger={updatePassenger}
            followAdultName={followAdultName(passenger.followAdult)}
            showPassengersTypeMenu={showPassengersTypeMenu}
            showGenderTypeMenu={showGenderTypeMenu}
            showFollowAdultMenu={showFollowAdultMenu}
            removePassenger={removePassenger}
            />
          })
        }
      </ul>
      <section className="add">
          <div className="adult" onClick={() => createAdult()}>
              添加成人
          </div>
          <div className="child" onClick={() => createChild()}>
              添加儿童
          </div>
      </section>
    </div>
  )
})
Passengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  showPassengersTypeMenu: PropTypes.func.isRequired,
  showGenderTypeMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
  removePassenger: PropTypes.func.isRequired,
  createAdult: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
}
export default Passengers