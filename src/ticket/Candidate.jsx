import React, { useContext, useMemo, useState } from 'react'
import { TrainContext } from './context'
import './Candidate.css'
import URI from 'urijs'
import dayjs from 'dayjs'
export default function Candidate(props) {

  const { tickets } = props
  const [expandIdx, setExpandIdx] = useState(-1)
  const onToggle = (idx) => {
    setExpandIdx(expandIdx === idx ? -1 : idx)
  }
  return (
    <div className="candidate">
      <ul>
        {
          tickets.map((ticket, index) => {
            return (
              <Seat 
                key = {ticket.type}
                {...ticket}
                idx={index}
                onToggle={onToggle}
                expand={expandIdx === index}
              />
            )
          })
        }
      </ul>
    </div>
  )
}
function Seat(props) {
  const {
    idx,
    onToggle,
    expand,

    type,
    ticketsLeft,
    priceMsg,
    channels
  } = props
  return (
    <li>
      <div className="bar">
        <span className="seat">{type}</span>
        <span className="price">
            <i>￥</i>
            {priceMsg}
        </span>
        <span className="btn" onClick={() => onToggle(idx)}>{expand ? '预订' : '收起'}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div 
        className="channels"
        style={{height: expand ? channels.length * 55 + 'px' : 0 }}
      >
        {
          channels.map(channel => {
            return <Channel {...channel} type={type} />
          })
        }
      </div>
    </li>
  )
}


function Channel(props) {
  const {desc, name, type} = props
  const {
    trainNumberStr,
    departStationStr,
    arriveStationStr,
    departDate,
  } = useContext(TrainContext)

  const src = useMemo(() => {
    return new URI('/order.html')
    .setSearch('trainNumberStr',trainNumberStr)
    .setSearch('type',type)
    .setSearch('departStationStr',departStationStr)
    .setSearch('arriveStationStr',arriveStationStr)
    .setSearch('departDate',dayjs(departDate).format('YYYY-MM-DD'))
    .toString()
  },[arriveStationStr, departDate, departStationStr, trainNumberStr, type])

  return (
    <div className="channel">
        <div className="middle">
            <div className="name">{name}</div>
            <div className="desc">{desc}</div>
        </div>
        <a href={src} className="buy-wrapper">
            <div className="buy">买票</div>
        </a>
    </div>
  )
}