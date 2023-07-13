const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token =req.headers.authorization
    if(!token){
        return res.status(209).send({msg:"Login first"})
    }
    const decode=jwt.verify(token,"jammi")
    if(decode){
        next()
    }else{
        return res.send({msg:"You need to login"})
    }
}
module.exports=auth