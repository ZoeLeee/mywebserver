
const data = require('../../../config/config.json');
const Db = require('./Db');

let aliDbUrl = data.dbUrl;

let ALiDb = new Db(aliDbUrl);

module.exports = {
  ALiDb
};

