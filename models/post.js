var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Post(name, title, text,pinglun) {
  this.name = name;
  this.title = title;
  this.text = text;
  this.pinglun=pinglun;
}

module.exports = Post;

//�洢һƪ���¼��������Ϣ
Post.prototype.save = function(callback) {
  var date = new Date();
  //Ҫ������ݿ���ĵ�
  var post = {
      name: this.name,
      date: date,
      time:"",
      title: this.title,
      text: this.text,
      pinglun:[]
  };
  //����ݿ�
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //��ȡ posts ����
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //���ĵ����� posts ����
      collection.insert(post, {
        safe: true
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);//ʧ�ܣ����� err
        }
        callback(null);//���� err Ϊ null
      });
    });
  });
};

////获得单条post/postlist
//Post.get = function(_id, callback) {
//
//  mongodb.open(function (err, db) {
//    if (err) {
//      return callback(err);
//    }
//    //��ȡ posts ����
//    db.collection('posts', function(err, collection) {
//      if (err) {
//        mongodb.close();
//        return callback(err);
//      }
//      var query = {};
//      if (_id) {
//        query._id=new ObjectID(_id);
//      }
//      //��� query �����ѯ����
//      collection.find(query).sort({
//        date: -1
//      }).toArray(function (err, docs) {
//        mongodb.close();
//        if (err) {
//          return callback(err);//ʧ�ܣ����� err
//        }
//         return callback(null, docs);//�ɹ�����������ʽ���ز�ѯ�Ľ��
//      });
//    });
//  });
//};





//获得单条post/postlist
Post.get = function(_id, callback) {


    async.waterfall([
        function(callback){

            mongodb.open(function (err, db) {
                callback(err,db,mongodb,_id);
            });
        },
        function(db,mongodb,_id, callback){
            db.collection('posts',function(err,collection){
                   callback(err,collection,mongodb,_id);
            });
        },
        function(collection,mongodb, _id,callback){
            var query = {};
            if (_id) {
                query._id=new ObjectID(_id);
            }
           collection.find(query).sort({
                date: -1
            }).toArray( function(err,docs){
                callback(err,mongodb,docs);
            });
        } ,
        function(mongodb,docs,callback){
               mongodb.close();

               callback(null,docs);
        }
    ], function (err, result) {

        if(err){
            return callback(err);
        }
        return callback(null,result)   ;

    });

};
