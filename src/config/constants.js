"use strict";

module.exports = function() {

	var env = process.env.NODE_ENV || 'development';
	var dbContants = databaseConfig();
	var appConstants = applicationConfig();

	var obj = {
		application : {
			url : appConstants[env]['url'],
			host : appConstants[env]['host'],
			port : appConstants[env]['port'],
		},
		database : {
			host     : dbContants[env]['host'],
			user     : dbContants[env]['user'],
			password : dbContants[env]['password'],
			database : dbContants[env]['database']
		},
		server : {
			defaultHost : 'http://localhost:81'
		}
	};

	return obj;

	function databaseConfig(){
		return {
			'development' : {
				'host' : 'localhost',
				'user' : 'root',
				'password' : '',
				'database' : 'net'
			}
		};
	}

	function applicationConfig(){
		return {
			'development' : {
				'url' : 'http://localhost:81',
				'host' : 'localhost',
				'port' : '81'
			}
		};
	}
}();