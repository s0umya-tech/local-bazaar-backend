const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    priceAtTime: Number,
  }],
  totalAmount: Number,
  status: { type: String, enum: ["placed", "confirmed", "delivered", "cancelled"], default: "placed" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
