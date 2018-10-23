const multer  = require('multer');
const fs=require('fs');

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // 接收到文件后输出的保存路径（若不存在则需要创建）
      cb(null, 'upload/');    
  },
  filename: function (req, file, cb) {
      // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
      cb(null, file.originalname);  
  }
});

// 创建文件夹
exports.createFolder = function(folder){
  try{
      // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
      // 如果文件路径不存在将会抛出错误"no such file or directory"
      fs.accessSync(folder); 
  }catch(e){
      // 文件夹不存在，以同步的方式创建文件目录。
      fs.mkdirSync(folder);
  }  
};

exports.readDir=()=>{
  fs.readdir('../upload/',function(err,files){
    //声明一个数组存储目录下的所有文件夹
      var floder = [];
      //从数组的第一个元素开始遍历数组
     (function iterator(i){
      //遍历数组files结束
      if(i==files.length){
        return;
      }
      //遍历查看目录下所有东西
            fs.stat('./test/'+files[i],function(err,stats){
              //如果是文件夹，就放入存放文件夹的数组中
              if(stats.isDirectory()){
                floder.push(files[i]);
              }
              iterator(i+1);
            })

      })(0)
  })

}