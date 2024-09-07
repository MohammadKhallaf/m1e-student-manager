const express = require("express");
const Ajv = require("ajv");
const cors = require("cors");

const ProductManager = require("./productManager");

const app = express();
const manager = new ProductManager();
const ajv = new Ajv();

// title  -> title length>3
// description
// price -> required > 0
// discount

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
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // control the accepted domains to access our endpoint
};
// BUILT-IN MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // json parser

// APPLICATION LEVEL MIDDLEWARE
app.use((request, response, next) => {
  console.log(`${new Date().toString()} - ${request.method} - ${request.url} `);
  next();
});

const authMiddleware = (req, res, next) => {
  // check req.body.key --> X
  // check header

  const apiKey = req.headers["x-api-key"];
  console.log(apiKey, "In the auth MIDDLEWARE");
  if (apiKey && apiKey === "m1e") next();
  else res.status(401).send("Unauthorized");
};

//  environment variables

app.get("/", (req, res) => {
  res.send("Hello,world");
});

// get one
app.get("/products/:id", async (req, res) => {
  const product = await manager.getProductById(req.params.id);

  res.json(product);
});

// get all or filtered
app.get("/products/", async (req, res) => {
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
app.patch("/products/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const newProduct = await manager.updateProduct(id, req.body);
  res.json(newProduct);
});

app.delete("/products/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  await manager.deleteOneProduct(id);
  res.json("Success");
});

// create
app.post("/products", authMiddleware, async (request, res) => {
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

// ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong!");
});

// run server
app.listen(PORT, () => {
  console.log("Server is running @ port", PORT);
});
