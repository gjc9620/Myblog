
/*
 * GET home page.
 */

var crypto = require('crypto'),
    User = require('../models/user.js'),
    Post = require('../models/post.js'),
    Pinglun = require('../models/pinglun.js');
    common=require('../routes/common.js');
var moment = require('moment');
    https = require('https');
    http = require('http');

module.exports = function(app) {
  
  //登陆
  app.get('/',common.checkLogin);
  app.get('/',function (req, res) {
     res.redirect('/show');
  });

  app.get('/index',common.checkLogin);
  app.get('/index', function (req, res) {
    res.redirect('/show');
  });

  app.post('/index', function (req, res) {



      User.get(req.body.name,function(err,user){
        if(!user){
            return res.json({status:0,mess:"账号错误"});
        }
        if(req.body.password!=user.password){
            return res.json({status:0,mess:"密码错误"});
        }
           req.session.user=user;
           return res.json({status:1,localtion:"/show"});
      });

      
  });


};

