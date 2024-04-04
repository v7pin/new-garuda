const express = require ("express");
const { Bank } = require("../db/db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const accountRouter= express.Router();

accountRouter.get("/balance",authMiddleware,async (req,res)=>{
 const userId= req.userId;
 console.log(userId);
 const account = await Bank.findOne({userId:userId});
 console.log(account);
 res.json({
    balance:account.balance
 })
 return; 
});

accountRouter.post("/transfer",authMiddleware,async(req,res)=>{
 const session =await mongoose.startSession();
  session.startTransaction();
  const {amount,to} = req.body; 

  const account = await Bank.findOne({ userId: req.userId }).session(session);

  if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
          message: "Insufficient balance"
      });
  }
  

    await Bank.findOneAndUpdate({userId:req.userId},{$inc:{balance:-amount}}).session();
    await Bank.findOneAndUpdate({userId:to},{$inc:{balance:amount}}).session();
session.commitTransaction();
   res.json({
    msg:"transaction complete"
   })
});
module.exports={accountRouter};