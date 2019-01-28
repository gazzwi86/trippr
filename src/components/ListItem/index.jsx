import React from "react";
import Button from "../Button";

const Item = ({ children, variation, removeItem, duration }) => (
  <li className="list-item">
    <span className="list-item__name">{children}</span>

    {duration && <span className="list-item__duration">{duration}</span>}

    <span className="result__remove-btn">
      <Button action={removeItem}>
        <i className="list-item__remove-icon" />
        <span className="list-item__remove-text">Remove</span>
      </Button>
    </span>
  </li>
);

export default Item;
