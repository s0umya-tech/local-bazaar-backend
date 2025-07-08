
const Shop = require('../models/Shop');
const sendResponse = require("../../utils/sendResponse");

const createShop = async (req, res) => {
    try {
      const { name, location, category, ownerId } = req.body;
  
      // ✅ Required validation
      if (!name) {
        return sendResponse(res, "ERROR", "shopName is required", null, 400);
      }
  
      // ✅ If admin is creating on behalf of someone
      if (req.body.ownerId && req.user.role !== "admin") {
        return sendResponse(res, "ERROR", "Only admin can assign ownerId manually", null, 403);
      }
  
      const shopOwner = req.user.role === "admin" && ownerId ? ownerId : req.user.userId;
  
      const newShop = new Shop({
        name,
        location,
        category,
        ownerId: shopOwner,
      });
  
      await newShop.save();
      return sendResponse(res, "SUCCESS", "Shop created", newShop, 201);
    } catch (err) {
      return sendResponse(res, "ERROR", err.message, null, 500);
    }
  };
  
  

const updateShop = async (req, res, next) =>{}
const deleteShop = async (req, res, next) =>{}
const getAllShops = async (req, res, next) =>{}