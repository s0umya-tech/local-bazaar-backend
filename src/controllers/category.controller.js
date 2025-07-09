const Category = require("../models/Category");
const sendResponse = require("../utils/sendResponse");

// ✅ Create a category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return sendResponse(res, "ERROR", "Category name is required", null, 400);

    const exists = await Category.findOne({ name });
    if (exists) return sendResponse(res, "ERROR", "Category already exists", null, 400);

    const category = await Category.create({ name });
    return sendResponse(res, "SUCCESS", "Category created", category, 201);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return sendResponse(res, "SUCCESS", "Categories fetched", categories);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

module.exports = { createCategory, getAllCategories };
