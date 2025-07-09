// 📦 src/controllers/address.controller.js
const Address = require("../models/Address");
const sendResponse = require("../utils/sendResponse");

// ✅ Add a new address
const addAddress = async (req, res) => {
  try {
    const { label, street, city, pincode, state, country } = req.body;
    if (!street || !city || !pincode) {
      return sendResponse(res, "ERROR", "Street, city, and pincode are required", null, 400);
    }

    const address = await Address.create({
      userId: req.user.userId,
      label,
      street,
      city,
      pincode,
      state,
      country
    });

    return sendResponse(res, "SUCCESS", "Address added", address, 201);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Get all addresses of logged-in user
const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.userId });
    return sendResponse(res, "SUCCESS", "Addresses fetched", addresses);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Update an address
const updateAddress = async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updated) return sendResponse(res, "ERROR", "Address not found or unauthorized", null, 404);
    return sendResponse(res, "SUCCESS", "Address updated", updated);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Delete an address
const deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deleted) return sendResponse(res, "ERROR", "Address not found or unauthorized", null, 404);
    return sendResponse(res, "SUCCESS", "Address deleted");
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

module.exports = {
  addAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress
};
