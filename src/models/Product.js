const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: String,

  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },

  mainImage: { type: String, required: true },
  otherImages: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
