import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLists } from "../../actions/lists";
import {
  getDestinations,
  addDestination,
  removeDestination
} from "../../actions/destinations";
import Auth from "../../context/Auth";
import FormBuilder from "../../components/FormBuilder";
import ListItem from "../../components/ListItem";
import "./styles.css";

class List extends Component {
  static contextType = Auth;
  listName = "";

  state = {
    destination: "",
    duration: ""
  };

  componentDidMount() {
    const { userId, token } = this.context;
    const { dispatch, match } = this.props;

    dispatch(getLists(userId, token));
    dispatch(getDestinations(match.params.list, token));
  }

  componentWillReceiveProps(props) {
    const { match, lists } = this.props;

    if (lists !== props.lists && props.lists && props.lists.length > 0) {
      this.listName =
        props.lists[
          props.lists.findIndex(item => item._id === match.params.list)
        ].name;
    }
  }

  inputChange = (e, obj) =>
    this.setState({
      [obj]: e.target.value
    });

  remove = id => {
    const { token } = this.context;
    const { dispatch } = this.props;

    dispatch(removeDestination(id, token));
  };

  onSubmit = async () => {
    try {
      const { token } = this.context;
      const { dispatch, match } = this.props;

      const res = await dispatch(
        addDestination(
          this.state.destination,
          this.state.duration,
          match.params.list,
          token
        )
      );

      if (res) {
        this.setState({
          destination: "",
          duration: ""
        });
      } else {
        throw Error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { destination, duration } = this.state;
    const { destinations } = this.props;

    const error =
      destinations &&
      destinations.errors &&
      destinations.errors.length > 0 &&
      destinations.errors[0].message
        ? destinations.errors[0].message
        : this.props.error;

    const form = [
      {
        type: "text",
        id: "destination",
        label: "Destination",
        placeholder: "London",
        onChange: e => this.inputChange(e, "destination"),
        value: destination,
        isRequired: true,
        isValid: this.state.isValid,
        validation: {
          type: "string",
          error: "This should be a valid string"
        }
      },
      {
        type: "number",
        id: "duration",
        label: "Duration",
        placeholder: "2",
        onChange: e => this.inputChange(e, "duration"),
        value: duration,
        isRequired: true,
        isValid: this.state.isValid,
        validation: {
          type: "int",
          error: "This should be a valid number"
        }
      },
      {
        type: "submit",
        id: "submit",
        children: "Submit"
      }
    ];

    return (
      <div className="list">
        <h1>List: {this.listName}</h1>
        <p>Add destinations to your list</p>

        <div className="list__form">
          <h2>Add a destination</h2>

          <FormBuilder form={form} error={error} onSubmit={this.onSubmit} />
        </div>

        <ul className="list__destinations">
          {destinations &&
            destinations.length > 0 &&
            destinations.map(list => (
              <ListItem
                key={list._id}
                removeItem={() => this.remove(list._id)}
                duration={list.duration}
              >
                {list.destination}
              </ListItem>
            ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(
  connect(({ destinations, lists }) => ({
    lists: lists.lists,
    loading: destinations.loading,
    error: destinations.error,
    destinations: destinations.destinations
  }))(List)
);
