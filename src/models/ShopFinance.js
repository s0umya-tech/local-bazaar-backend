const mongoose = require("mongoose");

const shopFinanceSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },

  orderAmount: {
    type: Number,
    required: true
  },

  commissionPercentage: {
    type: Number,
    required: true,
    default: 10 // % charged by company
  },

  commissionAmount: {
    type: Number,
    required: true
  },

  payoutAmount: {
    type: Number,
    required: true
  },

  payoutStatus: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid"
  },

  paidAt: Date
}, { timestamps: true });

module.exports = mongoose.model("ShopFinance", shopFinanceSchema);
