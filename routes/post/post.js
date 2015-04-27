
var crypto = require('crypto');
//    User = require('../models/user.js'),
var Post = require('../../models/post.js');
    Pinglun = require('../../models/pinglun.js');
    common=require('../../routes/common.js');
    async=require('async')  ;

var moment = require('moment');

module.exports = post = function(app) {
    app.get("/getPostList",function(req,res){

        Post.get(null,function(err,doec){


            for(var i=0;i<doec.length;i++){
                doec[i].date= moment(doec[i].date).format("YYYY-MM-DD hh:mm:ss");
                console.log(doec[i].pinglun.length);
                console.log(i);
                for(var j=0;j<doec[i].pinglun.length;j++)  {
                    doec[i].pinglun[j].day= moment(doec[i].pinglun[j].day).format("YYYY-MM-DD hh:mm:ss");
                }
            }
            res.json(doec);
            var str ='深入浅出node.js';

        });

    });

    app.put("/updatePost/:_id",function(req,res){
        var pinglun=new Pinglun(req.session.user.name,new Date(),req.body.text,req.body._id);

        pinglun.save(function(err){
            Post.get(req.body._id,function(err,doce){

                   var doce= doce[0];
                    doce.date= moment(doce.date).format("YYYY-MM-DD hh:mm:ss");

                    for(var j=0;j<doce.pinglun.length;j++)  {
                        doce.pinglun[j].day= moment(doce.pinglun[j].day).format("YYYY-MM-DD hh:mm:ss");
                    }

                   res.json(doce);
            });
        });
    });

    app.get('/new',function(req,res){
        res.render('new');
    })

    app.post('/newPost',function(req,res){
        var post=new Post(
            req.session.user.name,
            req.body.title,
            req.body.text,
            null
        );
        console.log(post);
        post.save(function(){
            res.json({});
        });
    });

    app.get('/show',common.checkLogin);
    app.get('/show',function(req,res){

        var hh=function (err,num1,num2){
            console.log(num1+num2);
            return (num1+num2);
        };

        res.render('show',{name:req.session.user.name});
    })


    ////////////////////
    app.post('/upload', function (req, res) {

        console.log(req.files);


        res.render('new', {

        });
    });

}