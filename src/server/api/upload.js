const fs = require('fs');
const path = require('path');
const storage = require('../Utility/utility').storage;
// const createFolder = require('../Utility/utility').createFolder;
var multer = require('multer');
const { REQUEST_CODE } = require('../Routes/enum');
// var uploadFolder = './upload/';
// createFolder(uploadFolder);
// 创建 multer 对象
var upload = multer({ storage: storage });

function getUploadUrl() {
    const ocType = os.type();
    if (ocType === "Windows_NT") {
        return path.resolve(__dirname, "../static");
    }
    else
        return staticUrl;
}


module.exports = router => {
    //上传
    router.post('/upload', function (req, res, next) {
        let filePath = getUploadUrl();
        let files = fs.readdirSync(filePath);
        files.forEach(f => {
            let tmpPath = path.join(filePath, f);
            if (f.includes("bundle.js") || f.includes(".css")) {
                fs.unlink(tmpPath, e => {
                });
            }
        });
        upload.any()(req, res, err => {
            if (err) {
                res.send({ code: REQUEST_CODE.Err, msg: err });
            }
            else {
                console.log("上传成功，上传位置在" + filePath + "文件数：" + req.files.length);
                res.send({ code: REQUEST_CODE.Ok });
            }
        });
    });
    router.post('/uploadPreview', function (req, res, next) {
        upload.any()(req, res, err => {
            if (err) {
                res.send({ code: REQUEST_CODE.Err, msg: err });
            }
            else {
                res.send({ code: REQUEST_CODE.Ok, data: { url: "/static/" + req.files[0].originalname } });
            }
        });
    });

    router.post('/register', function (req, res, next) {
        let user = new ALiDb.UserModel(req.body);
        user.save(function (err, u) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                    msg: "注册失败"
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
                data: u._id,
                msg: "注册成功"
            });
        });
    });

};