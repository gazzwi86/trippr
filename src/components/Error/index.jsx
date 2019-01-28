import React from "react";
import "./styles.css";

const Error = ({ children }) => (
  <div className="error">
    <p>{children}</p>
  </div>
);

export default Error;
