const express = require("express");
const router = express.Router();

// ROUTES
const authRoutes = require("./auth-routes");
const productsRoutes = require("./product-routes");
const cartRoutes = require("./cart-routes");

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
