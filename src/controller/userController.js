const User=require("../model/userSchema")
const Otp=require("../model/OtpSchema")
const {SendEmail} = require("../utils/userMailService")


module.exports={
    RegisterUser:async(req,res)=>{
        const {email,name}=req.body
    //   console.log(email,name);
        const user=await User.findOne({email:email})
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const date = new Date()
        

        if(!user){

            const newUser=new User({email:email,name:name})
             await newUser.save()

            const Otpmodel=new Otp({email:email,otp:otpCode,expireAt:date})
             await  Otpmodel.save()

            await SendEmail(email,otpCode,name)

            return res.status(201).json({
                message:"please check your mail for login OTP"
            })

        }

        const Otpmodel=new Otp({email:email,otp:otpCode,expireAt:date})
        await  Otpmodel.save()
        await SendEmail(user.email,otpCode,user.name)

        return res.status(200).json({
            message:"account has already registered,please check your email for login otp"
        })
    },

    LoginUser:async(req,res)=>{
        const {email,otpcode}=req.body

        const otp=await Otp.findOne({email:email,otp:otpcode})
        if(!otp){
            res.status(404).json({
                message:"incorrect otp"
            })
        }

        return res.status(200).json({
            message:'otp validation success'
        })
    }
}