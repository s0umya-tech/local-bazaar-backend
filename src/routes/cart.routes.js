// 🛒 src/routes/cart.routes.js
const express = require("express");
const router = express.Router();
const {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cart.controller");

// ✅ Cart actions for logged-in user
router.post("/add", addToCart);
router.get("/", getMyCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.delete("/", clearCart);

module.exports = router;
