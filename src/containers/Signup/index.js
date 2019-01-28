import React, { Component } from "react";
import fetchGQL from "../../helpers/fetchGQL";
import FormBuilder from "../../components/FormBuilder";
import "./styles.css";

class Signup extends Component {
  state = {
    isValid: true,
    email: "",
    password: "",
    country: ""
  };

  inputChange = (e, obj) =>
    this.setState({
      [obj]: e.target.value
    });

  onSubmit = async () => {
    try {
      const { history } = this.props;
      const { email, password, country } = this.state;

      const body = `
        mutation {
          createUser(userInput: {
            email: "${email}",
            password: "${password}",
            country: "${country}"
            lists: []
          }){
            _id
          }
        }
      `;

      const action = resp => {
        if (resp.createUser._id) {
          this.setState(
            {
              email: "",
              password: "",
              country: ""
            },
            () => history.pushState("/login")
          );
        }
      };

      await fetchGQL(body, action);
    } catch (err) {
      console.error(err);

      this.setState({
        error: err.message
      });
    }
  };

  render() {
    const { error } = this.state;
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
        isValid: this.state.isValid,
        validation: {
          type: "password",
          error:
            "Password must be a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
      },
      {
        type: "select",
        id: "country",
        label: "Country",
        placeholder: "Select country",
        options: [
          {
            text: "sad",
            value: "das"
          }
        ],
        onChange: e => this.inputChange(e, "country"),
        value: this.state.country,
        isRequired: true,
        isValid: this.state.isValid,
        validation: {
          type: "alpha",
          error: "Please select a valid country"
        }
      },
      {
        type: "submit",
        id: "submit",
        children: "Submit"
      }
    ];

    return (
      <div>
        <h1>Signup</h1>

        <FormBuilder form={form} error={error} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Signup;
