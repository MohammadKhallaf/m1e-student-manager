const express = require("express");
const router = express.Router();

// ROUTES
const authRoutes = require("./auth-routes");
const productsRoutes = require("./product-routes");

router.use("/products", productsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
