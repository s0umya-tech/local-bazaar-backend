const express = require("express");
const router = express.Router();
const {
  createShop,
  getMyShop,
  updateShop,
  getAllShops,
  getShopById,
  deleteShop
} = require("../controllers/shop.controller");

const { allowRoles } = require("../middlewares/role.middleware");

// 🛑 Only shopkeepers can create/update their own shops
router.post("/", allowRoles("shopkeeper"), createShop);
router.get("/my", allowRoles("shopkeeper"), getMyShop);
router.put("/:id", allowRoles("shopkeeper"), updateShop);

// ✅ Public APIs
router.get("/", getAllShops);
router.get("/:id", getShopById);

// 🔐 Admin can delete any shop
router.delete("/:id", allowRoles("admin"), deleteShop);

module.exports = router;
