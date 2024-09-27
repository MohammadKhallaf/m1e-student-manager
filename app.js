const cors = require("cors");
const express = require("express");

// MIDDLEWARES
const logMiddleware = require("./middlewares/log-middleware");

const apiRoutes = require("./routes/api-routes");

// CONFIGS
const connectDB = require("./configs/database");

require("dotenv").config();

const PORT = +process.env.PORT || 3000;
const corsOptions = {
  origin: "*", // control the accepted domains to access our endpoint
};

const app = express();

connectDB();

// BUILT-IN MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // json parser

// APPLICATION LEVEL MIDDLEWARE
app.use(logMiddleware);

app.use("/api", apiRoutes); // v1 | v2

// run server
app.listen(PORT, () => {
  console.log("Server is running @ port", PORT);
});
