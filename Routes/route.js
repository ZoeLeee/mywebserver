const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const storage = require('../Utility/utility').storage;
// const createFolder = require('../Utility/utility').createFolder;
var multer = require('multer');
// var uploadFolder = './upload/';
// createFolder(uploadFolder);
// 创建 multer 对象
var upload = multer({ storage: storage });

const staticUrl = require('../config/config').defaultConfig.staticUrl;

const {ArticleModel ,MLabArticleModel,UserModel} = require("../Db/Mongodb");

const REQUEST_CODE = {
  Ok: 0,
  Err: -1,
  Other: 1,
}
//上传
router.post('/upload', function (req, res, next) {
  let filePath = staticUrl;
  let files = fs.readdirSync(filePath);
  files.forEach(f => {
    let tmpPath = path.join(filePath, f);
    if (f.includes("bundle.js") || f.includes(".css")) {
      console.log(tmpPath);
      fs.unlink(tmpPath, e => {
      });
    }
  })
  upload.any()(req, res, err => {
    if (err) {
      res.send({ code: REQUEST_CODE.Err, msg: err });
    }
    else {
      console.log("上传成功，上传位置在" + filePath + "文件数：" + req.files.length)
      res.send({ code: REQUEST_CODE.Ok });
    }
  })
});

//获取文章列表
router.get('/articles', function (req, res, next) {
  ArticleModel.find(function (err, articles) {
    if (err) {
      res.send({
        code: REQUEST_CODE.Err,
        data: err.errmsg
      });
    }
    else
    {
      articles.sort((d1,d2)=>d2.update_time-d1.update_time);
      res.send({
        code: REQUEST_CODE.Ok,
        data: articles
      });
    }
  })
});
//获取文章
router.get('/article', function (req, res, next) {
  let articleId = req.query.id;
  ArticleModel.find({ _id: articleId }, function (err, article) {
    if (err) {
      res.send({
        code: REQUEST_CODE.Err,
        data: err
      })
    };
    res.send({
      code: REQUEST_CODE.Ok,
      data: article
    })
  })
});
//写文章
router.post('/write', function (req, res, next) {
  req.body.create_time=Date.now();
  req.body.update_time=Date.now();
  var article = new ArticleModel(req.body);
  article.save(function (err, article) {
    if (err) {
      res.send({
        code: REQUEST_CODE.Err,
      })
    };
    res.send({
      code: REQUEST_CODE.Ok,
      data: article._id
    })
  });

  article = new MLabArticleModel(req.body);
  article.save();
});
//更新文章信息
router.post('/update', function (req, res, next) {
  let id = req.body._id;
  req.body.update_time=Date.now();
  ArticleModel.updateOne({ _id: id }, req.body, function (err, r) {
    if (err) {
      res.send({
        code: REQUEST_CODE.Err,
      })
    };
    res.send({
      code: REQUEST_CODE.Ok,
    })
  });
  MLabArticleModel.updateOne({ _id: id }, req.body);
});

router.post('/register', function (req, res, next) {
  var user = new UserModel(req.body);
  user.save(function (err, u) {
    if (err) {
      res.send({
        code: REQUEST_CODE.Err,
        msg: "注册失败"
      })
    };
    res.send({
      code: REQUEST_CODE.Ok,
      data: u._id,
      msg: "注册成功"
    })
  })
});


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
  UserModel.find({ uname: data.uname, pwd: data.pwd }, function (err, users) {
    if (err) {
      res.send({
        code: REQUEST_CODE.Err,
        data: err
      })
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
      })
    }
    else
      res.send({
        code: REQUEST_CODE.Other,
        msg: "用户名或者密码错误"
      })
  })
});
router.get('/loginout', function (req, res, next) {
  //清除session，cookie
  req.session.user = null;
  req.session.isLogin = false;
  res.send({
    code: REQUEST_CODE.Ok,
    msg: "退出成功"
  })
})
router.get('/loginstatus', function (req, res, next) {
  if (req.session.isLogin)
    res.send({
      code: REQUEST_CODE.Ok,
    })
  else
    res.send({
      code: REQUEST_CODE.Err,
      msg: "未登陆"
    })
})
module.exports = router;
