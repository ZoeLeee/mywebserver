
const mongoose = require('mongoose');

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
let Article = mongoose.model('articles', articleSchema);
let User = mongoose.model('user', userSchema);

const db=require('../Utility/utility').connectDB();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

exports.Article=Article;
exports.User=User;