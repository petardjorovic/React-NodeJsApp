const express = require("express");
const { PORT } = require("./libs/config");
const mongoose = require("./database/config");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
