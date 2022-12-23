import React from 'react'
import './Passengers.css'
function Passenger(props) {
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
  } = props

  const isAdult = ticketType === 'Adult';

  return (
    <li className="passenger">
      <i className="delete">
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
}
export default function Passengers(props) {
  const {
    passengers,
    showPassengersTypeMenu,
    showGenderTypeMenu,
    showFollowAdultMenu,
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
}
