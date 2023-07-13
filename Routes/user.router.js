const express=require("express")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModel } = require("../Model/user.model")

const UserRouter=express.Router()


UserRouter.post("/signup",async(req,res)=>{
    const {Email,Password,Confirm_Password}=req.body
    try {
        const UserPresent= await userModel.findOne({Email})
        if(UserPresent){
            return res.status(209).send({msg:"user already present"})
        }
        if(Password!=Confirm_Password){
            return res.status(401).send({msg:"Not Matched Password and confirm Password"})
        }
        bcrypt.hash(Password,5,async(err,hash)=>{
            const newUser= new userModel({Email,Password:hash,Confirm_Password:hash})
            await newUser.save()

        })
        return res.status(200).send({msg:"Registration Successful"})
    } catch (error) {
        return res.status(209).send({msg:error.message})
    }
})


UserRouter.post("/login",async(req,res)=>{
    const {Email,Password}=req.body
    try {
        const UserPresent= await userModel.findOne({Email})
        if(!UserPresent){
            return res.status(209).send({msg:"user not present"})
        }
    
       bcrypt.compare(Password,UserPresent.Password,async(err,result)=>{
        if(result){
            const token= jwt.sign({userID:UserPresent._id},"jammi",{expiresIn:"1h"})
            return res.status(200).send({msg:"Login Successful",token,UserPresent})
        }else{
            return res.status(401).send({msg:"Wrong Crendentials"})
        }
       })
      
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

module.exports={UserRouter}