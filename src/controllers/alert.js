"use strict";

var Hapi = require('hapi');
var Q = require('q');
var alertDAO = require('../dao/alert');
var _ = require('underscore');

var ReplyHelper = require('../controllers/reply-helper');

function AlertController(){};
AlertController.prototype = (function(){

	return {
		findByID: function findByID(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.params;

			alertDAO.findByID(params, function (err, data) {
				helper.replyFindOne(err, data);
			});
		},
		find: function find(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.params;

			alertDAO.find(params, function (err, data) {
				helper.replyFind(err, data);
			});
		},
		insert: function insert(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.params;
			
			var insert = Q.denodeify(alertDAO.insert);
			var findByID = Q.denodeify(alertDAO.findByID);

			insert(params).then(function insert(data) {

				var result = data;
				if (result.exception) {
					reply(Hapi.error.badRequest(result.exception));
					done();
				} 
				params.alertId = result.insertId;
				return findByID(params);

			}).then(function (data) {

				var location = helper.url + request.path + '/' + params.alertId;

				reply(data[0])
					.type('application/json')
					.code(201)
					.header('Location', location);

			}).catch(function (err) {
				reply(Hapi.error.badImplementation(err));
			});
		},
		update: function update(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var payload = request.payload;
			var params = request.params;

			_.extend(params, payload);
			
			var update = Q.denodeify(alertDAO.update);
			var findByID = Q.denodeify(alertDAO.findByID);

			update(params).then(function update(data) {

				var result = data;
				if (result.exception) {
					reply(Hapi.error.badRequest(result.exception));
					done();
				}
				return findByID(params);

			}).then(function (data) {

				reply(data[0])
					.type('application/json');

			}).catch(function (err) {
				reply(Hapi.error.badImplementation(err));
			});

		},
		delete: function (request, reply){

			var helper = new ReplyHelper(request, reply);
			var params = request.params;

			alertDAO.delete(params, function (err, data) {
				helper.replyDelete(err, data);
			});
		}
	}
})();

var alertController = new AlertController();
module.exports = alertController;