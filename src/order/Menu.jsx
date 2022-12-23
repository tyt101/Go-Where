import classNames from "classnames";
import React, { memo } from "react";
import "./Menu.css";
import PropTypes from "prop-types";
const MenuItem = memo(function MenuItem(props) {
  const { title, active, onClick, value } = props;
  return (
    <li className={classNames({ active })} onClick={() => onClick(value)}>
      {title}
    </li>
  );
});
MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
const Menu = memo(function Menu(props) {
  const { show, hiddenMenu, options, onClick } = props;
  return (
    <div>
      {show && <div className="menu-mask" onClick={() => hiddenMenu()}></div>}
      <div className={classNames("menu", { show })}>
        <div className="menu-title"></div>
        <ul>
          {options &&
            options.map((option) => {
              return (
                <MenuItem key={option.title} {...option} onClick={onClick} />
              );
            })}
        </ul>
      </div>
    </div>
  );
});
Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  hiddenMenu: PropTypes.func.isRequired,
  options: PropTypes.array,
  onClick: PropTypes.func,
};
export default Menu;
