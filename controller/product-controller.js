//  CRUD
const Product = require("../models/product-model");
const { faker } = require("@faker-js/faker");

const createProduct = async (req, res) => {
  // instance Product model
  // const newProduct = new Product(data);
  // await newProduct.save();
  // _id, ...
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const readAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const readOneProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      res.status(404).json({ message: "Not Found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function createRandomProduct() {
  return {
    price: parseFloat(faker.commerce.price()),
    title: faker.commerce.productName(),
    discount: faker.number.int({ min: 0, max: 50 }),
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr({
      width: 600,
      height: 400,
      category: "product",
    }),
  };
}

const generateProducts = async (req, res) => {
  try {
    const count = +(req.body.count ?? 10);

    const fakeProducts = faker.helpers.multiple(createRandomProduct, {
      count: count,
    });

    await Product.insertMany(fakeProducts);

    res.status(201).json({
      message: `Successfully generated and inserted ${count} fake products`,
      products: fakeProducts,
    });
  } catch (error) {
    console.error("Error generating fake products:", error);
    res.status(500).json({ error: "Failed to generate fake products" });
  }
};

module.exports = {
  createProduct,
  readAllProducts,
  readOneProductById,
  generateProducts,
};
