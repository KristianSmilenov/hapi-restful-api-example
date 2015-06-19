"use strict";

var db = require('../middleware/db');

function DeviceDAO(){};
DeviceDAO.prototype = (function(){

	return {
		findByID: function findByID(params, callback) {

			var values = [
				params.id
			];

			var sql = "select id, name, name_masked, mgt_address from `deviceinfo`"+
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

			var sql = "select id, name, name_masked, mgt_address from `deviceinfo` LIMIT 50";

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			});
		}
	};
})();

var deviceDAO = new DeviceDAO();
module.exports = deviceDAO;