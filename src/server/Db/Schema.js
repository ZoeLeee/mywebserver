const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    content: String,
    scanCount: Number,
    tag: Array,
    update_time: Number,
    create_time: Number,
    imgUrl: String,
  },
  { collection: "articles" }
);
const UserSchema = new mongoose.Schema(
  {
    uname: { type: String, unique: true },
    pwd: String,
    authority: { type: Number, default: 0 }
  },
  { collection: "user" }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    scanCount: Number,
    category: Array,
    update_time: Number,
    create_time: Number,
    imgUrl: String,
    showUrl: String,
    github: String,
    gitee: String,
  },
  { collection: "projects" }
);

const ProjectCategorySchema = new mongoose.Schema(
  {
    title: String,
    parent: String,
  },
  { collection: "projectsCategory" }
);

module.exports = {
  ArticleSchema, UserSchema, ProjectSchema, ProjectCategorySchema
};