// src/controllers/product.controller.js
const Product = require("../models/Product");
const Shop = require("../models/Shop");
const sendResponse = require("../utils/sendResponse");

// ✅ Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, mainImage, otherImages, category, shopId } = req.body;

    if (!name || !price || !stock || !shopId) {
      return sendResponse(res, "ERROR", "Required fields are missing", null, 400);
    }

    const shop = await Shop.findOne({ _id: shopId, ownerId: req.user.userId });
    if (!shop) return sendResponse(res, "ERROR", "Unauthorized or shop not found", null, 403);

    const product = await Product.create({
      name,
      price,
      stock,
      description,
      mainImage,
      otherImages,
      category,
      shopId
    });

    return sendResponse(res, "SUCCESS", "Product created", product, 201);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get all products of a shop
const getProductsByShop = async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.shopId }).populate("category");
    return sendResponse(res, "SUCCESS", "Shop products fetched", products);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get all products (Public)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("shopId", "name").populate("category");
    return sendResponse(res, "SUCCESS", "All products fetched", products);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Update product (only shopkeeper)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendResponse(res, "ERROR", "Product not found", null, 404);

    const shop = await Shop.findOne({ _id: product.shopId, ownerId: req.user.userId });
    if (!shop) return sendResponse(res, "ERROR", "Unauthorized to update this product", null, 403);

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return sendResponse(res, "SUCCESS", "Product updated", updated);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Delete product (only shopkeeper)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendResponse(res, "ERROR", "Product not found", null, 404);

    const shop = await Shop.findOne({ _id: product.shopId, ownerId: req.user.userId });
    if (!shop) return sendResponse(res, "ERROR", "Unauthorized to delete this product", null, 403);

    await Product.findByIdAndDelete(req.params.id);
    return sendResponse(res, "SUCCESS", "Product deleted");
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

module.exports = {
  createProduct,
  getProductsByShop,
  getAllProducts,
  updateProduct,
  deleteProduct
};
