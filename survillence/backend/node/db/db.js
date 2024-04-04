const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vedant1:vedant1@vedant.jfvpwaf.mongodb.net/Paytm");

const UserSchema = new mongoose.Schema({
 firstName:{
    type: String,
    required:true
 },
 lastName:{
    type: String,
    required:true
 },
 userName:{
    type:String,
    required:true
 },
 passWord:{
    type:String ,
    required: true
 }
});
const User = mongoose.model ("User",UserSchema);
const bankSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }

});
 const Bank = mongoose.model("Bank",bankSchema);

module.exports = {User,Bank};
