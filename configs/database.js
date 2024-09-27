const mongoose = require("mongoose");

function connectDB() {
  const MONGO_URL = process.env.MONGO_URL;
  mongoose.connect(MONGO_URL);

  mongoose.connection
    .once("open", () => console.log("Connected to mongoDB"))
    .on("error", () => console.warn("Something went wrong"));
}

module.exports = connectDB;
