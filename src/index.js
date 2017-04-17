import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./observables";
import "semantic-ui-css/semantic.css";
import "./style/style.css";

store.initialize();

ReactDOM.render(
  <App store={store} />,
  document.getElementById("root")
);
