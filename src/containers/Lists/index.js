import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getLists, addList, removeList } from "../../actions/lists";
import Auth from "../../context/Auth";
import FormBuilder from "../../components/FormBuilder";
import ListItem from "../../components/ListItem";
import "./styles.css";

class Lists extends Component {
  static contextType = Auth;

  state = {
    name: ""
  };

  componentDidMount() {
    const { userId, token } = this.context;
    const { dispatch } = this.props;

    dispatch(getLists(userId, token));
  }

  inputChange = (e, obj) =>
    this.setState({
      [obj]: e.target.value
    });

  remove = id => {
    const { token } = this.context;
    const { dispatch } = this.props;

    dispatch(removeList(id, token));
  };

  onSubmit = async () => {
    try {
      const { userId, token } = this.context;
      const { dispatch } = this.props;
      const res = await dispatch(addList(this.state.name, userId, token));

      if (res) {
        this.setState({
          name: ""
        });
      } else {
        throw Error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { name } = this.state;
    const { lists } = this.props;

    const error =
      lists &&
      lists.errors &&
      lists.errors.length > 0 &&
      lists.errors[0].message
        ? lists.errors[0].message
        : this.props.error;

    const form = [
      {
        type: "text",
        id: "name",
        label: "List",
        placeholder: "South America 2019",
        onChange: e => this.inputChange(e, "name"),
        value: name,
        isRequired: true,
        isValid: this.state.isValid,
        validation: {
          type: "string",
          error: "This should be a valid string"
        }
      },
      {
        type: "submit",
        id: "submit",
        children: "Submit"
      }
    ];

    return (
      <div className="lists">
        <h1>Lists</h1>
        <p>Add a title to your list of destinations</p>

        <div className="lists__form">
          <h2>Add a list</h2>

          <FormBuilder form={form} error={error} onSubmit={this.onSubmit} />
        </div>

        <ul className="lists__list">
          {lists &&
            lists.length > 0 &&
            lists.map(list => (
              <ListItem key={list._id} removeItem={() => this.remove(list._id)}>
                <NavLink to={`/list/${list._id}`}>{list.name}</NavLink>
              </ListItem>
            ))}
        </ul>
      </div>
    );
  }
}

export default connect(({ lists }) => ({
  loading: lists.loading,
  error: lists.error,
  lists: lists.lists
}))(Lists);
