
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

  app.get('/aaa', function (req, res) {
      var fs = require('fs');


      fs.writeFile('delete.txt',"11a1d",{flag:"a"},function(err){
          console.log(err);
      });
      fs.writeFile('delete.txt',"2222",{flag:"ax"},function(err){
          console.log(err);
      });
//      fs.writeFile('delete.txt',"111",{falg:"r"},function(err){
//          console.log(err);
//      });
//      fs.writeFile('delete.txt',"55",{falg:"a"},function(err){
//          console.log(err);
//      });
      res.json({});


//      fs.readFile('delete.txt', function(err, docs){
//          var a = parseInt(docs);
//          a ++;
//
//          fs.writeFile("delete.txt",a,function(){
//
//          });
//      });

//      console.log('begin read a file');
//      var data = 321;
//      fs.readFile('package.json', function(err, docs){
//          data = docs;
//          console.log(data);
//          console.log(err);
//      });

  });

  //test
  app.get("/cc",function(){
      console.log("1");

      setImmediate(function () {
          console.log("2");
      });

      setTimeout(function () {
          console.log("3");
      },0);

      process.nextTick(function () {
          console.log("4");
      });


  })

  app.get("/bbb",function(req,res){

      var options = {
          hostname: 'www.baidu.com',
          port: 80,
          path: '',
          method: 'GET',
          headers: {
              "vary":"Accept-Encoding",
              "p3p":"CP=\" OTI DSP COR IVA OUR IND COM \"",
              "server":"BWS/1.1",
              "pragma":"no-cache",
              "cache-control":"no-cache",
              "bdpagetype":"1",
              "bdqid":"0xe1bd039800003af3",
              "bduserid":"0",
              "accept-ranges":"bytes"}

      };
      console.log(options) ;

      var body="";
      var that_res=res;
      var req = http.request(options, function(res) {

          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
              body+=chunk ;
          });
          res.on("end", function(){
              that_res.send(body+"<script>alert('adas')</script>") ;
          });

      });



      req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
      });

      req.end();
  })





};


/*

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/
