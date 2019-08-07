//login and resgister

const express=require("express");
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const gravatar = require('gravatar');
const keys=require("../../config/keys").secretOrKey;
const passport=require("passport");
const User=require("../../models/User");
//$route GET /api/users/test
//@desc 返回请求的json数据
//@acess  public 
router.get("/test",(req,res)=>{

    //返回json数据
    res.json({msg:"login works"})
})


//$route POST /api/users/register
//@desc 返回请求的json数据
//@acess  public 
//需要安装中间件body-parser

router.post("/register",(req,res) =>{

   //查询是否已经存在所给邮箱

   User.findOne({email:req.body.email})
   .then((user)=>{
       if(user){
           return res.status(400).json("邮箱已被注册!!!")
       }else{
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            avatar,
            password:req.body.password,
            identity:req.body.identity


        })
        //对莫玛进行加密，引入bcrypt
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw(err);

                newUser.password=hash;
                newUser.save()
                .then(user=>res.json(user))
                .catch(err=>console.log(err));

               
            });
        });

       }


   })
})


//$route POST /api/users/login
//@desc 返回token jwt passport
//@acess  public 
router.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password
    //查询数据库
    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(400).json("此用户名地址不存在!!!")
            }
            else{
            //密码匹配
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(isMatch){

                        const rule={
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        }
                        
                       // jwt.sign("规则",加密名字","过期时间","箭头函数")
                        jwt.sign(rule,keys,{expiresIn:3600},(err,token)=>{

                            if(err)  throw err;
                            res.json({
                                success:true,
                                token:"Bearer "+token
                            });

                        })
                        // res.json({msg:"success"})
                    }else{
                        return res.status(400).json("密码错误");
                    }


                })


            }

        })



})


//$route GET /api/users/current
//@desc return current user
//@acess  private 
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{

    //返回json数据
    res.json({
        //返回给用户的信息
        id:req.user.id,
        email:req.user.email,
        name:req.user.name,
        identity:req.user.identity



    })
})

module.exports=router;