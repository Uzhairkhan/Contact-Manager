import React from "react";
import { Link } from "react-router-dom";
import Axios from "../../config/axios";

export default class Home extends React.Component {
  handleLogout = () => {
    Axios.delete("/user/logout", {
      headers: {
        "x-auth": localStorage.getItem("x-auth")
      }
    })
      .then((response) => {
        const notice = response.data.notice;
        window.alert(notice);
        localStorage.clear("x-auth");
        this.props.history.push("/");
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <h3>Welcome to the phonebook</h3>
        <ul>
          {localStorage.getItem("x-auth") ? (
            <React.Fragment>
              <li>
                <a onClick={this.handleLogout} href="/">
                  Logout
                </a>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/user/register">Register</Link>
              </li>
              <li>
                <Link to="/user/login">Login</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </React.Fragment>
    );
  }
}
