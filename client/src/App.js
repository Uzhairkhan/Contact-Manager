import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/common/Home";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import ContactList from "./components/Contacts/ContactList";
import ContactNew from "./components/Contacts/ContactNew";
import ContactEdit from "./components/Contacts/ContactEdit";

function App() {
  return (
    <BrowserRouter>
      <div id="app-div">
        <h1>Phonebook</h1>
        <hr />

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/user/register" component={Register} />
          <Route path="/user/login" component={Login} />
          <Route path="/contacts" component={ContactList} exact={true} />
          <Route path="/contacts/New" component={ContactNew} />
          <Route path="/contacts/:id" component={ContactEdit} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
