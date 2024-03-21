
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email:{
    type:String,
    required:true
  }
  
  
  

  

},{timestamps:true});

const user = mongoose.model("user", userSchema);

module.exports = user;