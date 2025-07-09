const User = require("../models/User");
const sendResponse = require("../utils/sendResponse");

// ✅ Get logged-in user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return sendResponse(res, "ERROR", "User not found", null, 404);
    return sendResponse(res, "SUCCESS", "Profile fetched", user);
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

// ✅ Update user profile (name and email)
const updateProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.userId,
        { name, email },
        { new: true, select: "-password" }
      );
      if (!user) return sendResponse(res, "ERROR", "User not found", null, 404);
      return sendResponse(res, "SUCCESS", "Profile updated", user);
    } catch (err) {
      return sendResponse(res, "ERROR", err.message, null, 500);
    }
  };
  

// ✅ Delete user account
const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    return sendResponse(res, "SUCCESS", "User account deleted");
  } catch (err) {
    return sendResponse(res, "ERROR", err.message, null, 500);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount
};
