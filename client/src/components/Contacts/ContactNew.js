import React from "react";
import ContactForm from "./ContactForm";
import { connect } from "react-redux";
import { startAddContact } from "../../actions/contacts";

function ContactNew(props) {
  const handleSubmit = (contact) => {
    props.dispatch(startAddContact(contact, props));
  };
  return (
    <React.Fragment>
      <h3>Add new contact</h3>
      <ContactForm handleSubmit={handleSubmit} />
    </React.Fragment>
  );
}

export default connect()(ContactNew);
