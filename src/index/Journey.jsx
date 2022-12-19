import React from 'react'
import './Journey.css'
import switchImg from './img/switch.svg'
export default function Journey(props) {
  const {from, to, showCitySelector, exchangeFromTo} = props
  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input 
          type="text" 
          readOnly
          className="journey-input journey-from" 
          name='from'
          value={from}
        />
      </div>
      <div className="journey-switch" onClick={() =>exchangeFromTo()}>
        <img src={switchImg} alt="switch" width="70" height="50" />
      </div>
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input 
          type="text" 
          readOnly
          className="journey-input journey-to" 
          name='to'
          value={to}
        />
      </div>
    </div>
  )
}


