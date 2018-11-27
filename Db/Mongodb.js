
const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    content: String
  },
  { collection: "articles" }
);
let Article = mongoose.model('articles', articleSchema);

const db=require('../Utility/utility').connectDB();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

exports.Article=Article;