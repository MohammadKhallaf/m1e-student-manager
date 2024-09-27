const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
