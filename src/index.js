import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import middleware from "./middleware";
import rootReducer from "./reducers";
import App from "./containers/App/";
import "./index.css";

let initialState = {};
let cookie = Cookies.get("token");

if (cookie) {
  cookie = JSON.parse(cookie);

  if (cookie.token) {
    initialState = {
      user: {
        userId: cookie.userId,
        token: cookie.token,
        tokenExpires: cookie.tokenExpires
      }
    };
  }
}

const store = createStore(
  rootReducer,
  initialState,
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(middleware)
    : middleware
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
