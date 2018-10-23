const express = require('express');
const path=require('path');
const fs=require('fs');
const router = express.Router();
const storage=require('../Utility/utility').storage;
const createFolder=require('../Utility/utility').createFolder;
var multer  = require('multer');


var uploadFolder = './upload/';
createFolder(uploadFolder);
let destPath=path.resolve(__dirname,"../../");
console.log('destPath: ', destPath);
// 创建 multer 对象
var upload = multer({ storage:storage });

//上传
router.post('/upload', function (req, res, next) {
  let filePath=path.resolve(__dirname,'../../');
  fs.readdir(filePath,(err,files)=>{
    if(!err){
      console.log(files);
      files.forEach(f =>
        {
          let tmpPath=path.join(filePath,f)
            if (f.indexOf("bundle.js") !== -1)
                fs.unlink(tmpPath, e =>
                {
                });
        })
    }
  })
  upload.any()(req,res,err=>{
    res.send({success:"ok"})
  })
});

module.exports = router;
