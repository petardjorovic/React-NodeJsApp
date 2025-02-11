const express = require("express");
const { PORT } = require("./libs/config");
const mongoose = require("./database/config");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
