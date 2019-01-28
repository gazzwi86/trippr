import React from "react";
import classnames from "classnames";
import "./styles.css";

const Button = ({ children, type, variation, action }) => (
  <button
    className={classnames("button", {
      "button--secondary": variation === "secondary",
      "button--right": type === "submit"
    })}
    type={type}
    onClick={e => action && action(e)}
  >
    {children}
  </button>
);

export default Button;
