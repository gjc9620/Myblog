/**
 * Created with JetBrains WebStorm.
 * User: fanguohao
 * Date: 14-10-28
 * Time: 下午3:32
 * To change this template use File | Settings | File Templates.
 */

var crypto = require('crypto');
//    User = require('../models/user.js'),
//    Post = require('../models/post.js');
//    Pinglun = require('../models/pinglun.js');
var moment = require('moment');

module.exports = aaa = function(app) {
    app.get("/getPostList",function(req,res){
        return res.json({aaa:'ada'});
    })

}