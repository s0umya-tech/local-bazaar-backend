// 📦 src/routes/address.routes.js
const express = require("express");
const router = express.Router();
const {
  addAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress
} = require("../controllers/address.controller");

// ✅ Only for logged-in users
router.post("/", addAddress);
router.get("/", getMyAddresses);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;
