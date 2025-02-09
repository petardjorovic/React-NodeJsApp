const mongoose = require("mongoose");
const { URI } = require("../libs/config");

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Couldn't connect to MongoDB", err));

module.exports = mongoose;
