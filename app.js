const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const productsRoutes = require("./routes/product-routes");

require("dotenv").config();

// const productsRoutes = require("./products-routes");

const app = express();

const PORT = +process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // control the accepted domains to access our endpoint
};

mongoose.connect("mongodb://localhost:27017/m-two");

mongoose.connection
  .once("open", () => console.log("Connected to mongoDB"))
  .on("error", () => console.warn("Something went wrong"));

// BUILT-IN MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // json parser

// APPLICATION LEVEL MIDDLEWARE
app.use((request, response, next) => {
  console.log(
    `${new Date().toString()} - ${request.method} - ${request.url}  `,
    request.body
  );
  next();
});

// productsRoutes
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("Hello,world");
});

// run server
app.listen(PORT, () => {
  console.log("Server is running @ port", PORT);
});
