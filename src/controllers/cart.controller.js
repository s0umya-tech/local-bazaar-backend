// 🛒 src/controllers/cart.controller.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const sendResponse = require("../utils/sendResponse");

// ✅ Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
      return sendResponse(res, "ERROR", "Product ID and quantity required", null, 400);
    }

    const product = await Product.findById(productId);
    if (!product) return sendResponse(res, "ERROR", "Product not found", null, 404);

    const existing = await Cart.findOne({ userId: req.user.userId, productId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return sendResponse(res, "SUCCESS", "Cart updated", existing);
    }

    const cartItem = await Cart.create({ userId: req.user.userId, productId, quantity });
    return sendResponse(res, "SUCCESS", "Added to cart", cartItem, 201);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get current user's cart
const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user.userId }).populate("productId");
    return sendResponse(res, "SUCCESS", "Cart fetched", cart);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Update quantity of item in cart
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity <= 0) return sendResponse(res, "ERROR", "Invalid quantity", null, 400);

    const updated = await Cart.findOneAndUpdate(
      { userId: req.user.userId, productId: req.params.productId },
      { quantity },
      { new: true }
    );
    if (!updated) return sendResponse(res, "ERROR", "Cart item not found", null, 404);

    return sendResponse(res, "SUCCESS", "Cart item updated", updated);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Remove item from cart
const removeCartItem = async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({ userId: req.user.userId, productId: req.params.productId });
    if (!deleted) return sendResponse(res, "ERROR", "Cart item not found", null, 404);
    return sendResponse(res, "SUCCESS", "Cart item removed");
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Clear entire cart
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.userId });
    return sendResponse(res, "SUCCESS", "Cart cleared");
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

module.exports = {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
