import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ContactList(props) {
  return (
    <React.Fragment>
      <h3>Contacts</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.contacts.map((contact) => {
            return (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.mobile}</td>
                <td>{contact.email}</td>
                <td>
                  <Link to={`/contacts/${contact._id}`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <Link to="/contacts/new">Add new contact</Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};

export default connect(mapStateToProps)(ContactList);
