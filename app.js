const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// ROUTES
const productsRoutes = require("./routes/product-routes");
const authRoutes = require("./routes/auth-routes");

require("dotenv").config();

const PORT = +process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const corsOptions = {
  origin: "*", // control the accepted domains to access our endpoint
};

const app = express();

mongoose.connect(MONGO_URL);

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
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello,world");
});

// run server
app.listen(PORT, () => {
  console.log("Server is running @ port", PORT);
});
