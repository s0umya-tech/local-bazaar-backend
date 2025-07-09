const express = require("express");
const router = express.Router();
const { sendOtp, register, login } = require("../controllers/auth.controller");

router.post("/send-otp", sendOtp);       // public
router.post("/register", register);      // after OTP
router.post("/login", login);            // password or OTP

module.exports = router;
