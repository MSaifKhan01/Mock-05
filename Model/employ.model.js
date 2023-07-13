const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    First_Name:String,
    Last_Name:String,
    Email:String,
    Department:String,
    Salary:Number
})

const employeeModel=mongoose.model("employee",userSchema)
module.exports={employeeModel}