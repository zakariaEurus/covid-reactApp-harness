import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";
import { createStore, applyMiddleware } from "redux";
import Reducer from "./components/Reducers/Reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const middlewares = [thunk];
const store = createStore(Reducer, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
