"use strict";

var alertController = require('../controllers/alert');
var alertValidate = require('../validate/alert');

module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/v1/alerts',
			config : {
				handler: alertController.find,
                description: 'Gets all alerts',
                notes: 'Returns a list of alert items',
                tags: ['api']
			}
		},
		{
			method: 'GET',
			path: '/v1/alerts/{id}',
			config : {
				handler: alertController.findByID,
                description: 'Gets a single alert by ID',
                notes: 'Returns a single alert by its ID',
                tags: ['api'],
				validate: alertValidate.findByID
			}
		},
		{
			method: 'POST',
			path: '/v1/alerts',
			config : {
				handler : alertController.insert,
                description: 'Creates an alert item',
                notes: 'Creates an alert item and returns it',
                tags: ['api'],
				validate : alertValidate.insert
			}
		},
		{
			method: 'PUT',
			path: '/v1/alerts/{id}',
			config : {
				handler: alertController.update,
                description: 'Updates an alert item',
                notes: 'Updates an alert item and returns it',
                tags: ['api'],
				validate : alertValidate.update
			}
		},
		{
			method: 'DELETE',
			path: '/v1/alerts/{id}',
			config : {
				handler: alertController.delete,
                description: 'Deletes an alert item',
                tags: ['api'],
				validate : alertValidate.delete
			}
		}
	];
}();