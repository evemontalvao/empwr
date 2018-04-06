const mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    mongoConfig = require('../config/db.json')[env]['mongo'];

'use strict';

function _connection() {
    var username = mongoConfig.username,
        password = mongoConfig.password,
        server = mongoConfig.server,
        port = mongoConfig.port,
        database = mongoConfig.database,
        auth = username ? username + ':' + password + '@' : '';

    return 'mongodb://' + auth + server + ':' + port + '/' + database;
}

mongoose.connect(_connection());

var db = mongoose.connection;

db.on('error', function(err) {
    console.log(err)
});

db.once('open', function(callback) {
    console.log('connected to mongodb');
});

module.exports = mongoose;
