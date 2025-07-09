const express = require("express");
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const shopRoutes = require("./shop.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/shops", shopRoutes);

module.exports = router;
