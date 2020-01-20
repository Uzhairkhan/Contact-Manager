import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import { startSetContacts } from "./actions/contacts";

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(startSetContacts());

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
