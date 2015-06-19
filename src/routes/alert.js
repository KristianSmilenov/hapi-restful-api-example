"use strict";

var alertController = require('../controllers/alert');
var alertValidate = require('../validate/alert');

module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/v1/alerts',
			config : {
				handler: alertController.find
			}
		},
		{
			method: 'GET',
			path: '/v1/alerts/{id}',
			config : {
				handler: alertController.findByID//,
				//validate: alertValidate.findByID
			}
		},
		{
			method: 'POST',
			path: '/v1/alerts',
			config : {
				handler : alertController.insert//,
				//validate : alertValidate.insert
			}
		},
		{
			method: 'PUT',
			path: '/v1/alerts/{id}',
			config : {
				handler: alertController.update//,
				//validate : alertValidate.update
			}
		},
		{
			method: 'DELETE',
			path: '/v1/alerts/{id}',
			config : {
				handler: alertController.delete//,
				//validate : alertValidate.delete
			}
		}
	];
}();