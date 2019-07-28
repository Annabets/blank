const mongoose = require('mongoose');
const config = require('config');
const log = require('log')(module);

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));

const db = mongoose.connection;
db.on('error',log.error('connection error'));
db.once('open',log.info('database connected'));

module.exports = mongoose;