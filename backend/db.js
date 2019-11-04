require('dotenv').config();
const path = process.env.DB_PATH;
const flatfile = require('flat-file-db');

module.exports = table => flatfile.sync(path+table+'.db');