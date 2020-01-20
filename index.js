const express = require("express");
const app = express();
const port = 3002;

const { mongoose } = require("./config/database");
const { router } = require("./config/routes");
const cors = require("cors");

app.use(cors()); //
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Phonebook");
});

app.use("/", router);

app.listen(port, () => {
  console.log("listening to the port", port);
});
