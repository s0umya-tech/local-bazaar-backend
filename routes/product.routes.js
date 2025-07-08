const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

const { allowRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public Routes
router.get("/", getAllProducts); // List all products
router.get("/:id", getProductById); // Get a single product

// Protected Routes
router.post("/", allowRoles("shopkeeper"), createProduct);
router.put("/:id", allowRoles("shopkeeper"), updateProduct);
router.delete("/:id", allowRoles("shopkeeper"), deleteProduct);

module.exports = router;
