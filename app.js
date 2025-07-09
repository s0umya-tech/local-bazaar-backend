const express = require("express");
const router = express.Router();

const authRoutes = require("./routes/auth.routes");
const shopRoutes = require("./routes/shop.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");

const authMiddleware = require("./middlewares/auth.middleware");

// Public routes
router.use("/auth", authRoutes);

// JWT middleware (applied after /auth)
router.use(authMiddleware);

// Protected routes
router.use("/shops", shopRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
