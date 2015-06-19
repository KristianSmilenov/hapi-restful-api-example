"use strict";

var deviceController = require('../controllers/device');

module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/v1/devices',
			config : {
                handler: deviceController.find,
                description: 'Gets all devices',
                notes: 'Returns a list of device items',
                tags: ['api']
			}
		},
		{
			method: 'GET',
			path: '/v1/devices/{id}',
			config : {
                handler: deviceController.findByID,
                description: 'Gets a single device by ID',
                notes: 'Returns a single device item by its ID',
                tags: ['api'],
			}
		}		
	];
}();