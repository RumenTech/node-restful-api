// set up ========================
var express = require('express');
var app = express();                                // create our app with Express
var mongoose = require('mongoose');                 // mongoose for mongodb
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)

var serverRoot = './server';
var config = require(serverRoot + '/config');

// configuration =================
var database = require(serverRoot + '/connect-db');     // connect to mongoDB database specified in the configuration

app.use(bodyParser.urlencoded({'extended':'true'}));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                             // parse application/json
app.use(methodOverride());

require(serverRoot + '/routes/setup')(app);             // set up routes for the app

require(serverRoot + '/middlewares/error-handler')(app);// set up error handler

app.set('port', process.env.PORT || config.PORT);

app.listen(app.get('port'), '0.0.0.0', function() {
    console.log('App listening on port ' + app.get('port'));
});
