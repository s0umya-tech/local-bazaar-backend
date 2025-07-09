const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    role: { type: String, enum: ["customer", "shopkeeper", "admin"], default: "customer" },
    password: { type: String }, // for future use
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
