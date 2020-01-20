import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import contactsReducer from "../reducers/contactsReducer";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      contacts: contactsReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
