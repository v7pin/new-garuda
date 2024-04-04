const express = require("express");
const zod= require("zod");
const {User,Bank} = require("../db/db");
const UserRouter = express.Router();
const jwt= require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");


const userSchema= zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    userName:zod.string().email(),
    passWord:zod.string(),
});

const userloginSchema= zod.object({
    userName:zod.string().email(),
    passWord:zod.string(),
});

UserRouter.post("/signup", async (req,res)=>{
    console.log("signup");
 const user= req.body;
 const {success}= userSchema.safeParse(user);
 console.log(success);

 if(!success){
   return res.json({
        msg:"invalid user creadintials"
    })
 }
  const userres= await User.findOne({userName:user.userName});
  if(userres){
    return res.json({
        msg:"User already exists!"
    });
  };
  
 const createduser=await  User.create(user); 
 await Bank.create({
    userId:createduser._id,
    balance: 1 + Math.random() * 10000
 }) 
 console.log(createduser._id);
 const token = jwt.sign({userId:createduser._id},JWT_SECRET);
 res.json({
    msg:"user created successfully!",
    token:token
 });
});

UserRouter.post("/signin", async(req,res)=>{

    console.log("signin");
    const user= req.body;
    const {success}= userloginSchema.safeParse(user);
    if(!success){
      return res.json({
           msg:"invalid user creadintials"
       })
    }

    const userres= await User.findOne({userName:user.userName,passWord:user.passWord});
    if(userres){
      const token = jwt.sign({userId:userres},JWT_SECRET);
      res.json({
        token:token
      });
      return;
    } 

    res.status(411).json({
        msg:"Error while login"
    });
   
});

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

UserRouter.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
  console.log(req.userId)
  console.log("this is _id");
    await User.updateOne({_id: req.userId}, {
       firstName:req.body.firstName,
       passWord:req.body.passWord 
    });

    res.json({
        message: "Updated successfully"
    })
})


UserRouter.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter;
        const result = await User.find({
            $or: [{
                    firstName: {
                        $regex: filter,
                        $options: "i"
                    }
                },
                {
                    lastName: {
                        $regex: filter,
                        $options: "i"
                    }
                }
            ]
        });

        res.json({
            users: result.map(user => ({
                userName: user.userName,
                lastName: user.lastName,
                firstName: user.firstName,
                userId: user._id
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports= UserRouter;