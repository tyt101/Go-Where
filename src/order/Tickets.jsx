import React from 'react'
import './Tickets.css'
export default function Tickets(props) {
  const{
    seatType,
    price,
  } = props
  
  return (
    <div className="ticket">
      <p>
        <span className="ticket-type">{seatType}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  )
}
