const express=require("express")
const router=express.Router()
const user=require("../controller/userController")
const tryCatchMiddleware = require("../middlewares/tryCatch")




router.post("/register",tryCatchMiddleware(user.RegisterUser))
router.post("/login",tryCatchMiddleware(user.LoginUser))



module.exports=router