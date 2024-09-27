const express = require("express");
const router = express.Router();

// ROUTES
const authRoutes = require("./auth-routes");
const productsRoutes = require("./product-routes");

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);

module.exports = router;
