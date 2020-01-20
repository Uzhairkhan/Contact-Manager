import React from "react";
import Axios from "../../config/axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    Axios.post("/user/login", formData)
      .then((response) => {
        const data = response.data;
        if (data.token) {
          localStorage.setItem("x-auth", data.token);
          this.props.history.push("/");
        } else {
          window.alert(data);
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <React.Fragment>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <br />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <br />
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <input type="submit" value="Login" />
        </form>
      </React.Fragment>
    );
  }
}
