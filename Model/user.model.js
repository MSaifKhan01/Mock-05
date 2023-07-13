const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    Email:String,
    Password:String,
    Confirm_Password:String
})

const userModel=mongoose.model("user",userSchema)
module.exports={userModel}