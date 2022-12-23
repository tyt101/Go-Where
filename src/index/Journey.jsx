import React, { memo } from "react";
import "./Journey.css";
import PropTypes from "prop-types";
import switchImg from "./img/switch.svg";
const Journey = memo(function Journey(props) {
  const { from, to, showCitySelector, exchangeFromTo } = props;
  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          className="journey-input journey-from"
          name="from"
          value={from}
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} alt="switch" width="70" height="50" />
      </div>
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          className="journey-input journey-to"
          name="to"
          value={to}
        />
      </div>
    </div>
  );
});

Journey.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  showCitySelector: PropTypes.func.isRequired,
  exchangeFromTo: PropTypes.func.isRequired,
};
export default Journey;
