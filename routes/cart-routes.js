const express = require("express");
const cartController = require("../controller/cart-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.post("/merge", authMiddleware, cartController.mergeCart);

module.exports = router;
