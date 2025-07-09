const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controllers/category.controller");
const { allowRoles } = require("../middlewares/role.middleware");

// Admin-only: Create category
router.post("/", allowRoles("admin"), createCategory);

// Public: Get all categories
router.get("/", getAllCategories);

module.exports = router;
