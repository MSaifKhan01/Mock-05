const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers?.authorization
    // console.log(token);
    if(token){
        jwt.verify(token, "jammi", function(err, decoded) {
            // console.log(decoded);
            if(decoded){
                next()
            }else{
                res.status(401).send({"msg":"Wrong Credentials"})
            }
          });
    }else{
        res.status(401).send({"msg":"Login First"})
    }
}
module.exports=auth
