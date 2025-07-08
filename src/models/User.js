const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type:String, required: true},
    password: {type:String, required: true},
    phone: {type:String, required:true, unique: true},
    role: {type: String, enum:["customer", "shopkeeper", "admin"], default:"cutomer"},
    shopId :{type: mongoose.Schema.Types.ObjectId, ref:"Shop"}
},{timestamps: true});

module.exports= mongoose.model("User", userSchema)