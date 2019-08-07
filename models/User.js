const mongoose=require("mongoose");
const Schema=mongoose.Schema;


//创建schema
const UserSchema=new Schema({

//写入注册登录需要的字段

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
avatar:{
    type:String
},
identity:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}



})

module.exports=User=mongoose.model("users",UserSchema);