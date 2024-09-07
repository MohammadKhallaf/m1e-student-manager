const express = require("express");
const Ajv = require("ajv");
const authMiddleware = require("./middlewares/auth-middleware");
const ProductManager = require("./productManager");

const router = express.Router();

const manager = new ProductManager();
const ajv = new Ajv();

const productSchema = {
  type: "object",
  properties: {
    price: {
      type: "number",
      minimum: 0,
    },
    title: {
      type: "string",
      minLength: 3,
    },
    discount: {
      // 0 -> 100
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    description: {
      type: "string",
    },
  },
  required: ["title", "price"],
  additionalProperties: false,
};

const validateProduct = ajv.compile(productSchema);
// get one
router.get("/:id", async (req, res) => {
  const product = await manager.getProductById(req.params.id);

  res.json(product);
});

// get all or filtered
router.get("/", async (req, res) => {
  const query = req.query;
  // casting => + | Number()
  const from = +query.from;
  const to = +query.to;

  if (from && to) {
    console.log(from, to);
    const productList = await manager.getProductsByPriceFilter(from, to);

    res.json(productList);
  } else {
    const productList = await manager.getAllProducts();
    res.json(productList);
  }
});

// update
router.patch("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const newProduct = await manager.updateProduct(id, req.body);
  res.json(newProduct);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  await manager.deleteOneProduct(id);
  res.json("Success");
});

// create
router.post("", authMiddleware, async (request, res) => {
  const data = request.body;
  const valid = validateProduct(data);
  if (valid) {
    await manager.createProduct(data);
    res.status(200).json("Success");
  } else {
    res.status(400).json({
      message: validateProduct.errors.map((error) => {
        return {
          ...(!!error.instancePath && {
            field: error.instancePath,
          }),
          message: error.message,
          details: error.params,
        };
      }),
    });
  }
});

module.exports = router;
