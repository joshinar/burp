const mongoose = require("mongoose");
require("dotenv").config();
const db = () => {
  try {
    mongoose.connect(
      process.env.dbUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Connected To Database")
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
