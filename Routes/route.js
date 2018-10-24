const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const storage = require('../Utility/utility').storage;
const createFolder = require('../Utility/utility').createFolder;
var multer = require('multer');


// var uploadFolder = './upload/';
// createFolder(uploadFolder);
// 创建 multer 对象
var upload = multer({ storage: storage });

//上传
router.post('/upload', function (req, res, next) {
  let filePath = path.resolve(__dirname, '../../');
  console.log('filePath: ', filePath);
  fs.readdir(filePath, (err, files) => {
    if (!err) {
      files.forEach(f => {
        let tmpPath = path.join(filePath, f)
        if (f.indexOf("bundle.js") !== -1)
          fs.unlink(tmpPath, e => {
          });
      })
    }
    else {
      res.send({ success: "no" })
    }
  })
  upload.any()(req, res, err => {
    if (err)
      res.send({ success: "no" });
    else
      res.send({ success: "ok" });
  })
});

module.exports = router;
