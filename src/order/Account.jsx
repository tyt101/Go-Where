import React, { useState } from "react";
import classNames from "classnames";
import "./Account.css";
import PropTypes from "prop-types";
export default function Account(props) {
  const { passengerLen, price } = props;
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="account">
      <div
        className={classNames("price", {
          expanded,
        })}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="money">{passengerLen * price}</div>
        <div className="mount">支付金额</div>
      </div>
      <div className="button">提交按钮</div>
      {
        <div
          className={classNames("detail", {
            hidden: !expanded,
          })}
        >
          <div className="title">金额详情</div>
          <ul>
            <li>
              <span>火车票</span>
              <span>¥{price}</span>
              <span>x{passengerLen}</span>
            </li>
          </ul>
        </div>
      }
    </div>
  );
}
Account.propTypes = {
  passengerLen: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
