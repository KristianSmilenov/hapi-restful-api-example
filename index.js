'use strict';

var hapi = require('hapi');
var routes = require('./src/routes');
var constants = require('./src/config/constants.js');
var server = new hapi.Server({debug: {request: ['info', 'error']}});

var pack = require('../package'),
    swaggerOptions = {
        apiVersion: pack.version
    };

// Create server
var host = constants.application['host'];
var port = constants.application['port'];
server.connection({ host: host, port: port });

// Add all the routes within the routes folder
for (var route in routes) {
   server.route(routes[route]);
}

// Register Swagger documentation
server.register({
        register: require('hapi-swagger'),
        options: swaggerOptions
    }, function (err) {
        if (err) {
            server.log(['error'], 'hapi-swagger load error: ' + err)
        }else{
            server.log(['start'], 'hapi-swagger interface loaded')
        }
    });

module.exports = server;

server.start(function(err) {
    if (err) { throw err; }

    console.log('Server running at: ' + server.info.uri);
});