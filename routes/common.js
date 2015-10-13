/**
 * Created with JetBrains WebStorm.
 * User: fanguohao
 * Date: 14-11-3
 * Time: 下午3:10
 * To change this template use File | Settings | File Templates.
 */

/*
 * GET home page.
 */



module.exports.checkLogin=function  (req, res, next) {


        res.header("X-Frame-Options","SAMEORIGIN"); //禁止iframe套我页面
        if (req.session.user) {
        }else{
            return  res.render('index',{error:''});
        }
        next();
 }
