import React from "react";
import classnames from "classnames";
import "./styles.css";

const MenuBtn = ({ showMenu, toggleMenuAction }) => (
  <div className={classnames("menu-btn", { "menu-btn--active": showMenu })}>
    <button className="menu-btn__button" onClick={() => toggleMenuAction()}>
      <div className="menu-line menu-line--top" />
      <div className="menu-line menu-line--center" />
      <div className="menu-line menu-line--bottom" />
    </button>
  </div>
);
export default MenuBtn;
