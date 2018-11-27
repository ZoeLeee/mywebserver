const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const storage = require('../Utility/utility').storage;
const ObjectID = require('mongodb').ObjectID;
// const createFolder = require('../Utility/utility').createFolder;
var multer = require('multer');
const db=require('../Utility/utility').connectDB;
// var uploadFolder = './upload/';
// createFolder(uploadFolder);
// 创建 multer 对象
var upload = multer({ storage: storage });

const ArticleModel=require("../Db/Mongodb").Article;

//上传
router.post('/upload', function (req, res, next) {
  let filePath = path.resolve(__dirname, '../');
  let files=fs.readdirSync(filePath);
  files.forEach(f => {
    let tmpPath = path.join(filePath, f);
    if (f.includes("bundle.js"))
      fs.unlink(tmpPath, e => {
      });
  })
  upload.any()(req, res, err => {
    if (err){
      console.log(err);
      res.send({ success: "no",data:err});
    }
    else{
      console.log("上传成功，上传位置在"+filePath+"文件数："+req.files.length)
      res.send({ success: "ok" });
    }
  })
});

//获取文章列表
router.get('/articles', function (req, res, next) {
  ArticleModel.find(function(err,articles){
    if (err) {
      res.send({
        success:"none",
        data:err
      })
    };
    res.send({
      success:"ok",
      data:articles
    })
  })
});
//获取文章
router.get('/article/:articleId', function (req, res, next) {
  let articleId = req.params.articleId;
  ArticleModel.find({_id:articleId},function(err,article){
    if (err) {
      res.send({
        success:"no",
        data:err
      })
    };
    res.send({
      success:"ok",
      data:article
    })
  })
});
//写文章
router.post('/write', function (req, res, next) {
  var article = new ArticleModel(req.body);
  article.save(function(err,article){
    if (err) {
      res.send({
        success:"no",
      })
    };
    res.send({
      success:"ok",
      id:article._id
    })
  })
});


module.exports = router;
