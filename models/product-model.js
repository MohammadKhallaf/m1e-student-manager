const mongoose = require("mongoose");

// create new schema
const Schema = mongoose.Schema;

const productSchema = new Schema({
  price: Number,
  title: String,
  discount: Number,
  description: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
