import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/users";
import FormBuilder from "../../components/FormBuilder";
import Button from "../../components/Button";

class Login extends Component {
  state = {
    isValid: true,
    email: "",
    password: ""
  };

  inputChange = (e, obj) =>
    this.setState({
      [obj]: e.target.value
    });

  onSubmit = e => {
    const { email, password } = this.state;
    const { dispatch } = this.props;

    dispatch(login(email, password));
  };

  render() {
    const { history, user } = this.props;
    const error =
      user && user.errors && user.errors.length > 0 && user.errors[0].message
        ? user.errors[0].message
        : this.props.error;

    const form = [
      {
        type: "email",
        id: "email",
        label: "Email",
        placeholder: "Email",
        onChange: e => this.inputChange(e, "email"),
        value: this.state.email,
        isRequired: true,
        isValid: this.state.isValid,
        validation: {
          type: "email",
          error: "This should be a valid email"
        }
      },
      {
        type: "password",
        id: "password",
        label: "Password",
        placeholder: "Password",
        onChange: e => this.inputChange(e, "password"),
        value: this.state.password,
        isRequired: true,
        isValid: this.state.isValid
      },
      {
        type: "submit",
        id: "submit",
        children: "Submit"
      }
    ];

    return (
      <div>
        <h1>Login</h1>

        <FormBuilder form={form} error={error} onSubmit={this.onSubmit} />

        <div className="login__buttons">
          <Button variation="secondary" action={() => history.push("/signup")}>
            Signup
          </Button>

          <Button
            variation="secondary"
            action={() => history.push("/forgotten-password")}
          >
            Forgotten password
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ user }) => ({
  loading: user.loading,
  error: user.error,
  user: user.user
}))(Login);
