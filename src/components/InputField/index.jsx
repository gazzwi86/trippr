import React from "react";
import Field from "../Field";
import Label from "../Label";
import FieldError from "../FieldError";
import "./styles.css";

const InputField = ({
  label,
  type,
  id,
  placeholder,
  onChangeAction,
  value,
  isSubmitted,
  isValid,
  isRequired,
  validation
}) => (
  <Field>
    <div className="input-field">
      <Label text={label}>
        <input
          className="input-field__input"
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={onChangeAction}
          value={value}
        />
      </Label>

      <FieldError
        value={value}
        isSubmitted={isSubmitted}
        isValid={isValid}
        isRequired={isRequired}
        validation={validation}
      />
    </div>
  </Field>
);

export default InputField;
