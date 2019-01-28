import React from "react";
import Field from "../Field";
import Label from "../Label";
import FieldError from "../FieldError";

const SelectField = ({
  label,
  id,
  onChangeAction,
  placeholder,
  options,
  isSubmitted,
  isValid,
  isRequired,
  value,
  validation
}) => (
  <Field>
    <div className="select-field">
      <Label text={label}>
        <select id={id} defaultValue={null} onChange={onChangeAction}>
          <option value={null}>{placeholder}</option>
          {options &&
            options.length > 0 &&
            options.map(option => (
              <option value={option.value} key={option.value.replace(/ /, "")}>
                {option.text}
              </option>
            ))}
        </select>
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

export default SelectField;
