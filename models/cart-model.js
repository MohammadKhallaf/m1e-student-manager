const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],

  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
