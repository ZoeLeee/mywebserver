
const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    content: String
  },
  { collection: "articles" }
);
let Article = mongoose.model('articles', articleSchema);

var article = new Article({ title: "我的第一篇文章", content: "我的第一个个人网站", content: "<p>今天是2018年11月05日，</p><p><br></p><p>这是我的第一篇文章，</p><p><br></p><p>这是我的第一个个人网站</p>" });


const db=require('../Utility/utility').connectDB();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  article.save();
});

exports.Article=Article;