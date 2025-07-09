// src/routes/product.routes.js
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsByShop,
  updateProduct,
  deleteProduct,
  getAllProducts
} = require("../controllers/product.controller");
const { allowRoles } = require("../middlewares/role.middleware");

// ✅ Public - list all products
router.get("/", getAllProducts);

// ✅ Get all products of shopkeeper's own shop
router.get("/shop/:shopId", getProductsByShop);

// ✅ Shopkeeper-only actions
router.post("/", allowRoles("shopkeeper"), createProduct);
router.put("/:id", allowRoles("shopkeeper"), updateProduct);
router.delete("/:id", allowRoles("shopkeeper"), deleteProduct);

module.exports = router;
