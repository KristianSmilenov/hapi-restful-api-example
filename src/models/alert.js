"use strict";

var _ = require('underscore');
var Joi = require('joi');

function AlertModel(){
	this.schema = {
		id: Joi.number().integer(),
		severity: Joi.number().integer(),
		closed: Joi.number().optional(),
		origin: Joi.string().optional(),
	};
};

module.exports = AlertModel;