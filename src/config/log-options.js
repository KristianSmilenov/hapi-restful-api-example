"use strict";

module.exports = function () {
    
    var logOptions = {
        opsInterval: 1000,
        reporters: [
            {
                reporter: require('good-console'),
                events: { log: '*', response: '*' }
            }, {
                reporter: require('good-file'),
                events: { ops: '*' },
                config: {
                    path: './logs'
                }
            }, 
        /* good-http is a good-reporter implementation to write hapi server events to remote endpoints. 
            It makes a "POST" request with a JSON payload to the supplied endpoint.*/
            {
                reporter: 'good-http',
                events: { error: '*' },
                config: {
                    endpoint: 'http://prod.logs:3000',
                    wreck: {
                        headers: { 'x-api-key' : 12345 }
                    }
                }
            }]
    };
    
    return logOptions;
    
}();