const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/phonebook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  mongoose
};
