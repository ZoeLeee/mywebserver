const multer  = require('multer');
const fs=require('fs');
const {staticUrl} = require('../config/config.json');
const mongoose = require('mongoose');
const path=require('path');

// 创建文件夹
const createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        console.log(folder);
        fs.accessSync(folder); 
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }  
  };

  var os = require('os');

  function getUploadUrl() {
    const ocType = os.type();
    if (ocType === "Windows_NT") {
      return path.resolve(__dirname,"../static");
    }
    else
      return staticUrl
  }

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
      let filePth=file.fieldname.split("/");
      let path=getUploadUrl();
      if(filePth.length>1)
      {
        path+=filePth[0];
        createFolder(path);
      }  
      // 接收到文件后输出的保存路径（若不存在则需要创建）
      cb(null, path);    
  },
  filename: function (req, file, cb) {
      // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
      cb(null, file.originalname);  
  }
});


exports.connectDB=function(url){
    //连接数据库
   return mongoose.createConnection(url, { useNewUrlParser: true });
}