//  CRUD

const Cart = require("../models/cart-model");

// get user cart
const getUserCart = async (req, res) => {
  // user id -> param [~] | body [X] | current user [/]
  try {
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [] });
    }
    res.status(200).json({ message: "Success!", cart });
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = {
  getUserCart,
};
