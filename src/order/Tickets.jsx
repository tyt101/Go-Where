import React, { memo } from "react";
import PropTypes from "prop-types";
import "./Tickets.css";
const Tickets = memo(function Tickets(props) {
  const { seatType, price } = props;

  return (
    <div className="ticket">
      <p>
        <span className="ticket-type">{seatType}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  );
});
Tickets.propTypes = {
  seatType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default Tickets;
