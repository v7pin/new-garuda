const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");
const authMiddleware= async (req,res,next)=>{
    const authheader= await req.headers.authorization;
    console.log(authheader);
    if(!authheader||!authheader.startsWith('Bearer ')){
        res.status(403).json({
            msg:"access denied",
        })
        return;
    }
    const token = authheader.split(" ")[1];
  try{
     const verify= jwt.verify(token,JWT_SECRET);
     if(verify.userId){
        console.log("verify");
        req.userId= verify.userId;
        console.log(req.userId);
        next();
     }else{
     res.status(403).json({
        msg:"Not Authorized"
     });
   }

  }catch(e){
     console.log(e);
     res.status(403).json({
        msg:"Error in Authorization"
     });
  }
}

module.exports= {authMiddleware};