const { ALiDb } = require("../Db/Mongodb");
const { REQUEST_CODE } = require('../Routes/enum');

module.exports = router => {
  /*
      用户登录的接口
          提交的验证：
              1.用户名不能为空
              2.密码不能为空
          数据库的验证：
              1.用户名是否存在
              2.若存在密码是否正确
  */


  router.post('/login', function (req, res, next) {
    let data = req.body;
    ALiDb.UserModel.find({ uname: data.uname, pwd: data.pwd }, function (err, users) {
      if (err) {
        res.send({
          code: REQUEST_CODE.Err,
          data: err
        });
      };
      if (users.length > 0) {
        //登录成功
        req.session.user = users[0];
        req.session.isLogin = true;
        let data = {
          userInfo: users[0],
        };
        res.send({
          code: REQUEST_CODE.Ok,
          msg: "登陆成功",
          data
        });
      }
      else
        res.send({
          code: REQUEST_CODE.Other,
          msg: "用户名或者密码错误"
        });
    });
  });
  router.get('/loginout', function (req, res, next) {
    //清除session，cookie
    req.session.user = null;
    req.session.isLogin = false;
    res.send({
      code: REQUEST_CODE.Ok,
      msg: "退出成功"
    });
  });
  router.get('/loginstatus', function (req, res, next) {
    if (req.session.isLogin)
      res.send({
        code: REQUEST_CODE.Ok,
      });
    else
      res.send({
        code: REQUEST_CODE.Err,
        msg: "未登陆"
      });
  });
};