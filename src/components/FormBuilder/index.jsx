import React, { Component } from "react";
import validator from "./validator";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import Error from "../Error";

const validatorTypes = ["text", "email", "password", "select"];
const initChildState = form =>
  form && form.length > 0
    ? form.map(elm => (validatorTypes.indexOf(elm.type) >= 0 ? false : true))
    : [];

class FormBuilder extends Component {
  state = {
    isValid: initChildState(this.props.form),
    isSubmitted: false,
    error: ""
  };

  onInputChange = (e, i, onChange, validation) => {
    const { form } = this.props;
    const { isValid } = this.state;

    isValid[i] = validator(validation, form[i].isRequired, e.target.value);

    this.setState(
      {
        isValid
      },
      onChange(e)
    );
  };

  submit = e => {
    e.preventDefault();

    const { isValid } = this.state;
    const { onSubmit } = this.props;

    if (isValid.indexOf(false) >= 0) {
      this.setState({
        isSubmitted: true
      });
    } else {
      this.setState(
        {
          isSubmitted: false
        },
        () => onSubmit()
      );
    }
  };

  render() {
    const { form, error } = this.props;
    const { isValid, isSubmitted } = this.state;

    return (
      <form className="form-builder" onSubmit={this.submit} noValidate>
        {error && <Error>{error}</Error>}

        {form &&
          form.length > 0 &&
          form.map((elm, i) => {
            switch (elm.type) {
              case "number":
              case "text":
              case "email":
              case "password":
                return (
                  <InputField
                    key={elm.id}
                    {...elm}
                    onChangeAction={e =>
                      this.onInputChange(e, i, elm.onChange, elm.validation)
                    }
                    isValid={isValid[i]}
                    isSubmitted={isSubmitted}
                  />
                );

              case "select":
                return (
                  <SelectField
                    key={elm.id}
                    {...elm}
                    onChangeAction={e =>
                      this.onInputChange(e, i, elm.onChange, elm.validation)
                    }
                    isValid={isValid[i]}
                    isSubmitted={isSubmitted}
                  />
                );

              case "submit":
                return <Button key={elm.id} {...elm} />;

              default:
                return false;
            }
          })}
      </form>
    );
  }
}

export default FormBuilder;
