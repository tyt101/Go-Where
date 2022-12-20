import classNames from 'classnames'
import React from 'react'
import './HighSpeed.css'
export default function HighSpeed(props) {

  const {highSpeed, toggleHighSpeed} = props


  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={() => toggleHighSpeed()}>
      <input type="hidden" name="highSpeed" value={highSpeed} />
        <div
          className={classNames('high-speed-track', {
              checked: highSpeed,
          })}
        >
          <span
            className={classNames('high-speed-handle', {
                checked: highSpeed,
            })}
          ></span>
        </div>
      </div>
    </div>
  )
}
