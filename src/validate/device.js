"use strict";

var _ = require('underscore');
var Joi = require('joi');

var models = require('../models');

function DeviceValidate() { };
DeviceValidate.prototype = (function () {
    
    return {
        findByID: {
            params: (function params() {
                var deviceSchema = new models.Device().schema;
                return {
                    id : deviceSchema.id.required()
                };
            })()
        }
    };
})();

var deviceValidate = new DeviceValidate();
module.exports = deviceValidate;