import React from "react";
import "./styles.css";

const Label = ({ text, children }) => (
  <label className="label">
    <span className="label__text">{text}:</span>
    {children}
  </label>
);

export default Label;
