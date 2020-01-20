import React from "react";
import ContactForm from "./ContactForm";
import { connect } from "react-redux";
import { startEditContact } from "../../actions/contacts";

function ContactEdit(props) {
  const handleSubmit = (contact) => {
    props.dispatch(startEditContact(contact, props));
  };
  return (
    <React.Fragment>
      <h3>Edit contact</h3>
      {props.contact && (
        <ContactForm handleSubmit={handleSubmit} {...props.contact} />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state, props) => {
  return {
    contact: state.contacts.find(
      (contact) => contact._id === props.match.params.id
    )
  };
};

export default connect(mapStateToProps)(ContactEdit);
