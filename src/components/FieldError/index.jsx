import React from "react";
import Error from "../Error";

const FieldError = ({
  value,
  isSubmitted,
  isValid,
  isRequired,
  validation
}) => (
  <div className="field-error">
    {isSubmitted && !isValid && (
      <Error>
        {isRequired && !value
          ? "This field is required"
          : validation && validation.error}
      </Error>
    )}
  </div>
);

export default FieldError;
