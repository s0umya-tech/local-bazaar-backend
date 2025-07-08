const express = require("express");
const {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop
} = require("../controllers/shop.controller");

const { allowRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public
router.get("/:id", getShopById);

// Admin-only
router.get("/", allowRoles("admin"), getAllShops);
router.delete("/:id", allowRoles("admin"), deleteShop);

// Shopkeeper
router.post("/", allowRoles("shopkeeper","admin"), createShop);
router.put("/:id", allowRoles("shopkeeper","admin"), updateShop);

module.exports = router;
