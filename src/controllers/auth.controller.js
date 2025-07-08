const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        status: "ERROR",
        message: "Phone already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      phone,
      password: hashedPassword,
      role: role || "customer",
    });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "localbazaar-secret",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      status: "SUCCESS",
      message: "User registered successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({
        status: "ERROR",
        message: "Invalid phone or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "ERROR",
        message: "Invalid phone or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "localbazaar-secret",
      { expiresIn: "7d" }
    );

    return res.json({
      status: "SUCCESS",
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
};

module.exports = {
  register,
  login,
};
