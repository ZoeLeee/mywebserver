const { ALiDb } = require("../Db/Mongodb");
const { REQUEST_CODE } = require('../Routes/enum');


function GetProjectCategorys(param = {}) {
    return new Promise((res, rej) => {
        ALiDb.ProjectCategoryModel.find(param, function (err, categorys) {
            if (err) {
                rej(err);
            }
            else
                res(categorys);
        });
    });
}

function ParseCategorys(categorys) {
    let cgCache = new Set();
    let nodes = [];
    for (let cg of categorys) {
        if (cg.parent === "") {
            nodes.push({ id: cg._id, parent: cg.parent, title: cg.title, children: [] });
            cgCache.add(cg);
        }
    }
    while (cgCache.size !== categorys.length) {
        for (let cg of categorys) {
            if (cgCache.has(cg)) continue;
            parseNodes(nodes, cg, cgCache);
        }
    }
    return nodes;
}

function parseNodes(nodes, cg, cgCache) {
    let chidrenList = [];
    for (let node of nodes) {
        if (cg.parent === node.id.toString()) {
            node.children.push({ id: cg._id, parent: cg.parent, title: cg.title, children: [] });
            cgCache.add(cg);
            return;
        }
        else {
            chidrenList.push(node.children);
        }
    }
    for (let child of chidrenList) {
        parseNodes(child, cg, cgCache);
    }
}


module.exports = router => {
    //获取分类列表
    router.get('/projects-categorys', async function (req, res, next) {
        try {
            let categorys = await GetProjectCategorys();

            res.send({
                code: REQUEST_CODE.Ok,
                data: ParseCategorys(categorys)
            });

        } catch (err) {
            res.send({
                code: REQUEST_CODE.Err,
                data: err
            });
        }
    });

    //添加分类
    router.post('/addProjectCategory', async function (req, res, next) {

        if (!req.body.title) {
            res.send({
                code: REQUEST_CODE.Err,
                data: "参数错误，必须包含title"
            });
            return;
        }
        if (!req.body.parent)
            req.body.parent = "";

        try {
            let categorys = await GetProjectCategorys({ parent: req.body.parent });

            let doc = categorys.find(d => d.title === req.body.title);
            if (doc) {
                res.send({
                    code: REQUEST_CODE.Err,
                    data: "title重复了",
                });
            }
            else {
                let project = new ALiDb.ProjectCategoryModel(req.body);

                let data = await project.save();

                res.send({
                    code: REQUEST_CODE.Ok,
                    data: data._id
                });
            }
        }
        catch (err) {
            res.send({
                code: REQUEST_CODE.Err,
                data: err
            });
        }
    });

    //更新分类信息
    router.post('/updateCategory', function (req, res, next) {
        let { id, title } = req.body;

        ALiDb.ProjectCategoryModel.updateOne({ _id: id }, { title }, function (err, r) {
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

    //删除分类
    router.delete('/deleteCategory', function (req, res, next) {
        let id = req.body.data.id;
        if (!id) {
            res.send({
                code: REQUEST_CODE.Err,
                msg: "请传入Id",
            });
            return;
        }
        ALiDb.ProjectCategoryModel.remove({ _id: id }, function (err, r) {
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