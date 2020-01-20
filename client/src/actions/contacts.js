import axios from "../config/axios";

export const setContacts = (contacts) => {
  return {
    type: "SET_CONTACTS",
    payload: contacts
  };
};

export const startSetContacts = () => {
  return (dispatch) => {
    axios
      .get("/contacts", {
        headers: {
          "x-auth": localStorage.getItem("x-auth")
        }
      })
      .then((response) => {
        if (response.data.name === "JsonWebTokenError") {
          window.alert(response.data.message);
        } else {
          dispatch(setContacts(response.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addContact = (contact) => {
  return {
    type: "ADD_CONTACT",
    payload: contact
  };
};

export const startAddContact = (contact, props) => {
  return (dispatch) => {
    axios
      .post("/contacts", contact, {
        headers: {
          "x-auth": localStorage.getItem("x-auth")
        }
      })
      .then((response) => {
        if (response.data.errors) {
          window.alert(response.data.message);
        } else if (response.data.errmsg) {
          window.alert(response.data.errmsg);
        } else {
          dispatch(addContact(response.data));
          props.history.push("/contacts");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editContact = (contact) => {
  return {
    type: "EDIT_CONTACT",
    payload: contact
  };
};

export const startEditContact = (contact, props) => {
  return (dispatch) => {
    axios
      .put(`/contacts/${props.match.params.id}`, contact, {
        headers: {
          "x-auth": localStorage.getItem("x-auth")
        }
      })
      .then((response) => {
        dispatch(editContact(response.data));
        props.history.push("/contacts");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
