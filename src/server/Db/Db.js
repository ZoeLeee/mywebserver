const mongoose = require('mongoose');
const { ArticleSchema, UserSchema, ProjectSchema, ProjectCategorySchema } = require('./Schema');

class Db {
    constructor(url) {
        this.init(url);
    }
    init(url) {
        this._intance = mongoose.createConnection(url, { useNewUrlParser: true });

        this.ArticleModel = this._intance.model('articles', ArticleSchema);
        this.UserModel = this._intance.model('user', UserSchema);
        this.ProjectModel = this._intance.model("projects", ProjectSchema);
        this.ProjectCategoryModel = this._intance.model("projectCategory", ProjectCategorySchema);

        this._intance.on('error', console.error.bind(console, 'connection error:'));
        this._intance.once('open', function () {
            console.log(url.split("@")[1] + "数据库打开成功");
        });
    }
}

module.exports = Db;