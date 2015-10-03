var mongoose = require('mongoose');
var serverRoot = './';
var config = require(serverRoot + 'config');
var models = require(serverRoot + 'models'); // Load mongoose models

mongoose.connect(config.db);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + config.db);
});

mongoose.connection.on('error', function() {
    console.error('Mongoose connection error: ' + config.db);
});

mongoose.connection.on('disconnected', function() {
    console.error('Mongoose connection disconnected');
});

module.exports = mongoose.connection;