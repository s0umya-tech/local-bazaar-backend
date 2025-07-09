const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    shopName: {type:String, required:true},
    location: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    isActive: {type: Boolean, default: true},
    ownerId : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    contactNumber: { type: String, required: true }, 
    offersDelivery: { type: Boolean, default: false },
    deliveryInstructions: String,
  
    requiresAdvancePayment: { type: Boolean, default: false },
    upiId: String
}, {timestamps: true});

module.exports = mongoose.model("Shop", shopSchema);
