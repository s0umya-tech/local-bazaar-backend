const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  // ✅ Embedded address snapshot (copied from Address model)
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    landmark: String
  },

  deliveryMethod: {
    type: String,
    enum: ["pickup", "delivery"],
    default: "pickup"
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "UPI"],
    default: "COD"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  status: {
    type: String,
    enum: ["placed", "confirmed", "cancelled", "shipped", "delivered"],
    default: "placed"
  },

  deliveryStatus: [
    {
      status: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
