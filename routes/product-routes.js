const express = require("express");
const productController = require("../controller/product-controller");

const router = express.Router();

router.get("/:id", productController.readOneProductById);
router.get("/", productController.readAllProducts);
router.post("/gen", productController.generateProducts);
router.post("/", productController.createProduct);

module.exports = router;
