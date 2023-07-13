const express=require("express")
const { employeeModel } = require("../Model/employ.model")

// const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// const { userModel } = require("../Model/user.model")

const EmployeeRouter=express.Router()


EmployeeRouter.post("/employees",async(req,res)=>{
    const {First_Name,Last_Name,Email,Department,Salary}=req.body
    try {
        const UserPresent= await employeeModel.findOne({Email})
        if(UserPresent){
            return res.status(209).send({msg:"Employee already present"})
        }
       const newEmp=new employeeModel({First_Name,Last_Name,Email,Department,Salary})
       await newEmp.save()
       
        return res.status(200).send({msg:"Employee Added Successful",newEmp})
    } catch (error) {
        return res.status(209).send({msg:error.message})
    }
})

EmployeeRouter.delete("/employeesdelete/:id",async (req,res)=>{
    try {
        let {id}=req.params
        const deleteemployee=await employeeModel.findByIdAndDelete({_id:id})
        return res.status(200).send({msg:"Deleted Employee"})
    } catch (error) {
        res.status(401).send({msg:error.message})
    }
})

EmployeeRouter.get("/employees",async(req,res)=>{
    const {Department}=req.query
    try {
        const filterDep=await employeeModel.find({Department})
        return res.status(200).send(filterDep)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})


module.exports={EmployeeRouter}