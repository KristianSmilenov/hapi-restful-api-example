'use strict';

var hapi = require('hapi');
var routes = require('./src/routes');
var constants = require('./src/config/constants');
var server = new hapi.Server({
    debug: {
        request: ['info', 'error']
    }
});
var logOptions = require('./src/config/log-options');

// Create server
var host = constants.application['host'];
var port = constants.application['port'];
server.connection({ host: host, port: port });

// Add all the routes within the routes folder
for (var route in routes) {
   server.route(routes[route]);
}

// Register Swagger documentation
var pack = require('./package'),
    swaggerOptions = {
        apiVersion: pack.version
    };
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

// Register 'good' - server and process monitoring plugin
server.register({
    register: require('good'),
    options: logOptions
}, function (err) {
    if (err) {
        server.log(['error'], 'good monitoring load error: ' + err)
    } else {
        server.log(['start'], 'good monitoring loaded')
    }
});

module.exports = server;

server.start(function (err) {
    if (err) { throw err; }
        
    console.log('Server running at: ' + server.info.uri);
});