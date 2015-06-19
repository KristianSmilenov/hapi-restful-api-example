"use strict";

var _ = require('underscore');
var Joi = require('joi');

var models = require('../models');

function AlertValidate(){};
AlertValidate.prototype = (function(){

	return {
		findByID: {
			path: (function path() {
				var alertSchema = new models.Alert().schema;
				return {
					id : alertSchema.id.required()
				};
			})()
		},
		insert: {
			payload: (function payload() {
				var alertSchema = new models.Alert().schema;
				return {
					severity : alertSchema.severity.required(),
					closed: alertSchema.closed.required(),
					origin: alertSchema.origin.required()
				};
			})()
		},
		update: (function update() {
			var alertSchema = new models.Alert().schema;
			return {
				path: {
					id : alertSchema.id.required()
				},
				payload: {
					severity : alertSchema.severity.required(),
					closed: alertSchema.closed.required(),
					origin: alertSchema.origin.required()
				}
			}
		})(),
		delete: {
			path: (function path() {
				var alertSchema = new models.Alert().schema;
				return {
					id : alertSchema.id.required()
				};
			})()
		}
	};
})();

var alertValidate = new AlertValidate();
module.exports = alertValidate;