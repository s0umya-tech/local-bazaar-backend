const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    shopName: {type:String, required:true},
    location: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    isActive: {type: Boolean, default: true},
    ownerId : {type: mongoose.Schema.Types.ObjectId, ref:"User"}
}, {timestamps: true});

module.exports = mongoose.model("Shop", shopSchema);
