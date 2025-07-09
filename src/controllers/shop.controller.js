const Shop = require("../models/Shop");
const sendResponse = require("../utils/sendResponse");

// ✅ Create a shop (Shopkeeper)
const createShop = async (req, res) => {
  try {
    const { name, location, category, contactNumber, deliveryAvailable, upiId } = req.body;

    if (!name) return sendResponse(res, "ERROR", "Shop name is required", null, 400);

    const existing = await Shop.findOne({ ownerId: req.user.userId });
    if (existing) return sendResponse(res, "ERROR", "You already have a shop", null, 400);

    const shop = await Shop.create({
      name,
      location,
      category,
      contactNumber,
      deliveryAvailable,
      upiId,
      ownerId: req.user.userId
    });

    return sendResponse(res, "SUCCESS", "Shop created", shop, 201);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get current shopkeeper's shop
const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ ownerId: req.user.userId }).populate("category");
    if (!shop) return sendResponse(res, "ERROR", "No shop found", null, 404);
    return sendResponse(res, "SUCCESS", "Shop fetched", shop);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Update shop (only your own)
const updateShop = async (req, res) => {
  try {
    const updated = await Shop.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return sendResponse(res, "ERROR", "Shop not found or unauthorized", null, 404);
    }

    return sendResponse(res, "SUCCESS", "Shop updated", updated);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get all shops (Public)
const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("ownerId", "name phone").populate("category");
    return sendResponse(res, "SUCCESS", "All shops fetched", shops);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get shop by ID (Public)
const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate("category").populate("ownerId", "name phone");
    if (!shop) return sendResponse(res, "ERROR", "Shop not found", null, 404);
    return sendResponse(res, "SUCCESS", "Shop fetched", shop);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Delete shop (Admin only)
const deleteShop = async (req, res) => {
  try {
    const deleted = await Shop.findByIdAndDelete(req.params.id);
    if (!deleted) return sendResponse(res, "ERROR", "Shop not found", null, 404);
    return sendResponse(res, "SUCCESS", "Shop deleted");
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

module.exports = {
  createShop,
  getMyShop,
  updateShop,
  getAllShops,
  getShopById,
  deleteShop
};
