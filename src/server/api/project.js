const { ALiDb, MLabDb } = require("../Db/Mongodb");
const { REQUEST_CODE } = require('../Routes/enum');

module.exports = router => {
    //获取文章列表
    router.get('/projects', function (req, res, next) {
        ALiDb.ProjectModel.find(function (err, projects) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                    data: err.errmsg
                });
            }
            else {
                projects.sort((d1, d2) => d2.update_time - d1.update_time);
                res.send({
                    code: REQUEST_CODE.Ok,
                    data: projects
                });
            }
        });
    });
    //获取文章
    router.get('/getProject', function (req, res, next) {
        const query = {};
        if (req.query.id) {
            query._id = req.query.id;
        }

        if (req.query.categoryId) {
            query.categoryId = req.query.categoryId;
        }

        ALiDb.ProjectModel.find(query, function (err, project) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                    data: err
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
                data: project
            });
        });
    });
    //添加项目
    router.post('/addProject', function (req, res, next) {
        req.body.create_time = Date.now();
        req.body.update_time == Date.now();
        if (!req.body.imgUrl)
            req.body.imgUrl = "";
        if (!req.body.github)
            req.body.github = "";
        if (!req.body.gitee)
            req.body.gitee = "";
        if (!req.body.status)
            req.body.status = 0;
        if (!req.body.describe)
            req.body.describe = "";
        if (!req.body.showUrl)
            req.body.showUrl = "";
        req.body.isDelete = false;

        let project = new ALiDb.ProjectModel(req.body);
        project.save(function (err, data) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                    data: err,
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
                data: data._id
            });
        });

        // project = new MLabDb.ProjectModel(req.body);
        // project.save();
    });
    //更新信息
    router.post('/update-project', function (req, res, next) {
        let id = req.body.id;
        req.body.update_time = Date.now();
        ALiDb.ProjectModel.updateOne({ _id: id }, req.body, function (err, r) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
            });
        });
        // MLabDb.ProjectModel.updateOne({ _id: id }, req.body);
    });

    //删除文章
    router.delete('/delete-project', function (req, res, next) {
        let id = req.body.data.id;
        if (!id) {
            res.send({
                code: REQUEST_CODE.Err,
                msg: "请传入Id",
            });
            return;
        }
        ALiDb.ProjectModel.remove({ _id: id }, function (err, r) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                    msg: err,
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
                msg: "删除数据成功",
            });
        });
        MLabDb.ProjectModel.remove({ _id: id });
    });
};