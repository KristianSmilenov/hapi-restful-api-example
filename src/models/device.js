"use strict";

var _ = require('underscore');
var Joi = require('joi');

function DeviceModel(){
	this.schema = {
		id: Joi.number().integer(),
		name: Joi.string().max(128),
		name_masked: Joi.string().max(64),
		mgt_address: Joi.string().max(64),
	};
};

module.exports = DeviceModel;