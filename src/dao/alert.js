"use strict";

var db = require('../middleware/db');

function AlertDAO(){};
AlertDAO.prototype = (function(){

	return {
		findByID: function findByID(params, callback) {

			var values = [
				params.id
			];

			var sql = "SELECT id, severity, closed, origin, plugin_name FROM alerts"+
					" where id = ?";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		find: function find(params, callback) {

			var values = [
			];

			var sql = "SELECT id, severity, closed, origin, plugin_name FROM alerts LIMIT 50";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		insert: function insert (params, callback) {

			var values = [
				params.severity,
				params.closed,
				params.origin,
				"API_INSERT_" + Math.random()
			];

			var sql = "insert into alerts "+
					" (severity, closed, origin, plugin_name)"+
					" values (?,?,?, ?)";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		update: function update (params, callback) {

			var values = [
				params.severity,
				params.closed,
				params.origin,
				params.id
			];

			var sql = "update alerts "+
					" set severity = ?, "+
					" closed = ?, "+
					" origin = ? "+
					" where id = ?";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
		delete: function (params, callback) {

			var values = [
				params.id
			];

			var sql = "delete from alerts"+
					" where id = ?";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		},
	};
})();

var alertDAO = new AlertDAO();
module.exports = alertDAO;
