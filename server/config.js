var _ = require('lodash');
var env = process && process.env.NODE_ENV || 'development';
console.log(env);
var PORT = 5000;

// Default configuration settings shared among all environments
var defaults = {
    'PORT': PORT,
    'brand': 'TEST APP'
};

var development = {
    'host': 'http://localhost:' + PORT,
    'db': 'mongodb://localhost:27017/testapp',
    'ENV': 'development'
};

var production = {
    'host': 'http://www.example.com',
    'db': '',
    'ENV': 'production'
};

module.exports = {
    'development': _.extend(development, defaults),
    'production': _.extend(production, defaults)
}[env];