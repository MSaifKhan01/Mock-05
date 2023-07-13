const express=require("express")
const { Connection } = require("./Config/db")
const { UserRouter } = require("./Routes/user.router")
const { EmployeeRouter } = require("./Routes/employee.router")
const cors=require("cors")
const auth = require("./Middleware/auth")




require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",UserRouter)
app.use("/",auth,EmployeeRouter)

app.listen(process.env.port,async()=>{
    await Connection
    console.log("Connected")
})