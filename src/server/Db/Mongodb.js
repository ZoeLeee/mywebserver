
const data = require('../../../config/config.json');
const Db = require('./Db');

let mlabUrl = data.dbUrl;
let aliDbUrl = data.aLiDbUrl;

let ALiDb=new Db(aliDbUrl);
let MLabDb=new Db(mlabUrl);

module.exports={
  ALiDb,MLabDb
}

