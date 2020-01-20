const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(email) {
        return validator.isEmail(email);
      },
      message: function() {
        return "Invalid email";
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId
  }
});
const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact
};
