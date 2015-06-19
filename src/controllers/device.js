"use strict";

var Hapi = require('hapi');
var Q = require('q');
var deviceDAO = require('../dao/device');
var _ = require('underscore');

var ReplyHelper = require('../controllers/reply-helper');

function DeviceController(){};
DeviceController.prototype = (function(){

	return {
		findByID: function findByID(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.params;

			deviceDAO.findByID(params, function (err, data) {
				helper.replyFindOne(err, data);
			});
		},
		find: function find(request, reply) {
			var helper = new ReplyHelper(request, reply);
			var params = request.query;

			deviceDAO.find(params, function (err, data) {
				helper.replyFind(err, data);
			});
		}
	}
})();

var deviceController = new DeviceController();
module.exports = deviceController;