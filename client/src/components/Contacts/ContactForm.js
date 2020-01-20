import React from "react";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "",
      mobile: this.props.mobile || "",
      email: this.props.email || ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      mobile: this.state.mobile,
      email: this.state.email
    };

    this.props.handleSubmit(formData);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <br />
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Mobile:
            <br />
            <input
              type="text"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
          </label>
          <br />
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
          <br />
          <input type="submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default ContactForm;
