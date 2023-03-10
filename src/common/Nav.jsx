import React, { memo, useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Nav.css";
const Nav = memo(function Nav(props) {
  const { date, prev, next, isPrevDisabled, isNextDisabled } = props;

  const currentDate = useMemo(() => {
    const d = dayjs(date);
    return d.format("M月D日 ") + d.locale("zh-cn").format("ddd");
  }, [date]);

  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classNames("nav-prev", {
          "nav-disabled": isPrevDisabled,
        })}
      >
        前一天
      </span>
      <span>{currentDate}</span>
      <span
        onClick={next}
        className={classNames("nav-next", {
          "nav-disabled": isNextDisabled,
        })}
      >
        后一天
      </span>
    </div>
  );
});
Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};
export default Nav;
