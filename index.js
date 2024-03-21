const express=require('express')
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
require("dotenv").config()



app.use(cors())
app.use(express.json())



const userRouter=require("./src/Router/userRouter")
app.use(userRouter)





const mongoDB = process.env.DB_URL



main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Db connected");
}


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})