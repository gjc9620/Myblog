var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function pinglun(name, day, text, id) {
  this.name = name;
  this.day = day;
  this.text = text;
  this.id=id;
}

module.exports = pinglun;

//�洢һ��������Ϣ
pinglun.prototype.save = function(callback) {
  var a=this;
  //����ݿ�
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //��ȡ posts ����
    db.collection('posts', function (err,collection){
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //ͨ���û���ʱ�估��������ĵ�������һ�����Զ�����ӵ����ĵ��� comments ������
      collection.update({
	     "_id": new ObjectID(a.id)
      }, {
        $push: {"pinglun": a}
      } , function (err) {
          mongodb.close();
          if (err) {
            return callback(err);
          }
          callback(null);
      });   
    });
  });
//    return this;
};
