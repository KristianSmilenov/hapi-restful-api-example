"use strict";

var _ = require('underscore');
var Joi = require('joi');

var models = require('../models');

function AlertValidate(){};
AlertValidate.prototype = (function(){

	return {
        findByID: {
            params: (function params() {
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
                params: {
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
            params: (function params() {
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