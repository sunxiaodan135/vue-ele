const  JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const User=mongoose.model('users');//用户模型
const keys=require("../config/keys");//引入key
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;//secret


module.exports=passport=>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
    
        //console.log(jwt_payload);//获取了对应内容信息
        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }

                return done(null,false);
            

            })
            .catch(err=>console.log(err));
    }));

}