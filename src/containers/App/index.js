import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Redirect, Route } from "react-router-dom";
import { logout } from "../../actions/users";
import Auth from "../../context/Auth";
import Wrapper from "../../components/Wrapper";
import Page404 from "../Page404";
import Home from "../Home";
import Login from "../Login";
import Signup from "../Signup";
import Settings from "../Settings";
import Lists from "../Lists";
import List from "../List";
import Results from "../Results";

class App extends Component {
  logout = () => {
    const { dispatch, history, user } = this.props;

    dispatch(logout());

    if (user.token) {
      history.push("/login");
    }
  };

  render() {
    const {
      user: { userId, token, tokenExpires }
    } = this.props;

    return (
      <Auth.Provider
        value={{
          userId: userId,
          token: token,
          tokenExpires: tokenExpires,
          logout: this.logout
        }}
      >
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              render={() => (token ? <Redirect to="/lists" /> : <Login />)}
            />
            <Route
              exact
              path="/signup"
              render={() => (token ? <Redirect to="/lists" /> : <Signup />)}
            />
            <Route
              exact
              path="/settings"
              render={() => (!token ? <Redirect to="/login" /> : <Settings />)}
            />
            <Route
              exact
              path="/lists"
              render={() => (!token ? <Redirect to="/login" /> : <Lists />)}
            />
            <Route
              exact
              path="/list/:list"
              render={() => (!token ? <Redirect to="/login" /> : <List />)}
            />
            <Route
              exact
              path="/list/:list/results"
              render={() => (!token ? <Redirect to="/login" /> : <Results />)}
            />
            <Route component={Page404} />
          </Switch>
        </Wrapper>
      </Auth.Provider>
    );
  }
}

export default withRouter(
  connect(({ user }) => ({
    user
  }))(App)
);
