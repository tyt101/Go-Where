import classNames from 'classnames';
import React from 'react'
import './Menu.css'
function MenuItem(props) {
  const {title, active, onClick, value} = props
  return (
    <li 
    className={classNames({ active })}
    onClick={() => onClick(value)}
    >{title}</li>
  )
}

export default function Menu(props) {
  const {show, hiddenMenu, options, onClick} = props
  return (
    <div>
      {
        show && (
          <div className="menu-mask" onClick={() => hiddenMenu()}></div>
        )
      }
      <div className={classNames('menu', { show })}>
        <div className="menu-title"></div>
        <ul>
            {options &&
              options.map(option => {
                  return <MenuItem key={option.title} {...option} onClick={onClick} />
              })}
        </ul>
      </div>
    </div>
  )
}
