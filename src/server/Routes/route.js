const express = require('express');
const article = require('../api/article');
const project = require('../api/project');
const projectCategory = require('../api/projectCategory');
const registerSign = require('../api/sign');
const upload = require('../api/upload');
const router = express.Router();

registerSign(router);
upload(router);
article(router);
project(router);
projectCategory(router);

module.exports = router;
