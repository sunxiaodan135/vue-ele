//引入express
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
const passport=require('passport');
const app=express();

//引入user.js
const users=require("./routers/api/users");

//引入profile.js
const profiles=require("./routers/api/profiles");

//DB mongodb
const db=require("./config/keys").mongoURL;

//使用body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

// parse application/json
app.use(bodyParser.json())

mongoose.connect(db)
        .then (()=>console.log("连接成功"))
        .catch(err=>console.log(err))



//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);

//设置路由

// app.get("/",(req,res)=>{

//     res.send("Hello World")
// })

//使用router
app.use("/api/users",users);
app.use("/api/profiles",profiles);

//设置端口
const port=process.env.PORT||5000;
//监听端口
app.listen(port,  ()=> {
    console.log(`server running on ${port} `);
})
