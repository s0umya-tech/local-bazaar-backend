const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendResponse = require("../utils/sendResponse");

const otpStore = {}; // Temporary in-memory OTP

// 🔹 Step 1: Send OTP
const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return sendResponse(res, "ERROR", "Phone is required", null, 400);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  console.log(`📲 OTP for ${phone}: ${otp}`);
  return sendResponse(res, "SUCCESS", "OTP sent (check console)");
};

// 🔹 Step 2a: Register after OTP
const register = async (req, res) => {
  const { phone, otp, name, password, role } = req.body;
  const existing = await User.findOne({ phone });
  if (existing) return sendResponse(res, "ERROR", "User already exists", null, 400);

  const record = otpStore[phone];
  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return sendResponse(res, "ERROR", "Invalid or expired OTP", null, 400);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ phone, name, password: hashed, role });

  delete otpStore[phone];

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return sendResponse(res, "SUCCESS", "Registered successfully", { token, user }, 201);
};

// 🔹 Step 2b: Login via password or OTP
const login = async (req, res) => {
  const { phone, password, otp } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return sendResponse(res, "ERROR", "User not found", null, 404);

  if (otp) {
    const record = otpStore[phone];
    if (!record || record.otp !== otp || record.expires < Date.now()) {
      return sendResponse(res, "ERROR", "Invalid or expired OTP", null, 400);
    }
    delete otpStore[phone];
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendResponse(res, "ERROR", "Incorrect password", null, 401);
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return sendResponse(res, "SUCCESS", "Login successful", { token, user });
};

module.exports = { sendOtp, register, login };
