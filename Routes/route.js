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
    if (err)
      res.send({ success: "no" });
    else{
      console.log("上传成功，上传位置在"+filePath+"文件数："+req.files.length)
      res.send({ success: "ok" });
    }
  })
});

module.exports = router;
