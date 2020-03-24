
const mongoose = require('mongoose');
const {defaultConfig} =require('../config/config');

let mlabUrl=defaultConfig.dbUrl;
let aliDbUrl=defaultConfig.aLiDbUrl;

const MLabDb=require('../Utility/utility').connectDB(mlabUrl);
const ALidb=require('../Utility/utility').connectDB(aliDbUrl);

let articleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    content: String,
    scanCount:String,
    tag:Array,
    time:String,
    imgUrl:String
  },
  { collection: "articles" }
);
let userSchema = new mongoose.Schema(
  {
    uname: { type: String, unique: true },
    pwd: String,
    authority:{type:Number,default:0}
  },
  { collection: "user" }
);
let Article = ALidb.model('articles', articleSchema);
let MLabArticle = MLabDb.model('articles', articleSchema);
let User = ALidb.model('user', userSchema);

MLabDb.on('error', console.error.bind(console, 'connection error:'));
MLabDb.once('open', function () {
});
ALidb.on('error', console.error.bind(console, 'connection error:'));
ALidb.once('open', function () {
});

exports.ArticleModel=Article;
exports.UserModel=User;
exports.MLabArticleModel=MLabArticle;
