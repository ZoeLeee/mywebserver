const { ALiDb } = require("../Db/Mongodb");
const { REQUEST_CODE } = require('../Routes/enum');

module.exports = router => {
    //获取文章列表
    router.get('/articles', function (req, res, next) {
        ALiDb.ArticleModel.find(function (err, articles) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                    data: err.errmsg
                });
            }
            else {
                articles.sort((d1, d2) => d2.update_time - d1.update_time);
                res.send({
                    code: REQUEST_CODE.Ok,
                    data: articles
                });
            }
        });
    });
    //获取文章
    router.get('/article', function (req, res, next) {
        let articleId = req.query.id;
        ALiDb.ArticleModel.find({ _id: articleId }, function (err, article) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                    data: err
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
                data: article
            });
        });
    });
    //写文章
    router.post('/write', function (req, res, next) {
        req.body.create_time = Date.now();
        req.body.update_time = Date.now();
        let article = new ALiDb.ArticleModel(req.body);
        article.save(function (err, data) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
                data: data._id
            });
        });
    });
    //更新文章信息
    router.post('/update', function (req, res, next) {
        let id = req.body._id;
        req.body.update_time = Date.now();
        ALiDb.ArticleModel.updateOne({ _id: id }, req.body, function (err, r) {
            if (err) {
                res.send({
                    code: REQUEST_CODE.Err,
                });
            };
            res.send({
                code: REQUEST_CODE.Ok,
            });
        });
    });

    //删除文章
    router.delete('/delete', function (req, res, next) {
        let id = req.body.data._id;
        if (!id) {
            res.send({
                code: REQUEST_CODE.Err,
                msg: "请传入Id",
            });
            return;
        }
        ALiDb.ArticleModel.remove({ _id: id }, function (err, r) {
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
    });

};