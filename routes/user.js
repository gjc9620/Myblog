
var crypto = require('crypto');
    User = require('../models/user.js');
var moment = require('moment');

module.exports  = function(app) {
    app.get("/logout",function(req,res){
        console.log(req.session.user);
        req.session.user=null;
        res.redirect('/index')  ;
    });



    //注册
    app.get('/register',function(req,res){
        res.render('register', {
            title: '注册',
            success: null,
            error: null,
            name: "asdadssa"
        });
    });

    app.post('/register', function (req, res) {

        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        //判断用户名
        var patrn=/^(\w){6,20}$/;
        if (!patrn.exec(req.body.name)){
            return res.json({status:0,mess:"用户名只能输入6-20个字母、数字、下划线"});//返回注册页
        }
        //判断密码
        if ( req.body.password.length<3){
            return res.json( {status:0,mess:'密码长度需大于3' });//返回注册页
        }

        //检查用户名是否已经存在
        User.get(newUser.name, function (err, user) {
            if (user) {
                return res.json({status:0,mess:'用户名已存在'} );//返回注册页
            }
            //如果不存在则新增用户
            newUser.save(function (err, user) {
                if (err) {
                    return res.json({status:0,mess:err});//注册失败返回主册页
                }
                req.session.user = user;//用户信息存入 session
//       return res.render('register',{success:'注册成功',error:null});//注册成功后返回注册
                return res.json({status:1,mess:'注册成功'});
            });
        });
    });



}