"use strict";

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var server = require('../../');
var should = require('should');

var alertModel = require('../../src/models/alert');

describe('Alert routes', function () {
    
    describe('GET /v1/alerts', function () {
        
        var options = {
            method: 'GET',
            url: '/v1/alerts'
        };

        it('should return statusCode 200', function (done) {
            server.inject(options, function (res) {
                res.statusCode.should.be.exactly(200);
                done();
            });
        });

        it('returns an array of objects', function (done) {
            server.inject(options, function (response) {
                response.result.should.be.an.instanceOf.Array;
                response.result.length.should.be.exactly(50);
                for (var i = 0; i < response.result.length; i++) {
                    response.result[i].should.be.an.instanceOf.Object;
                };
                done();
            });
        });

    });

    describe('GET /v1/alerts/{id}', function () {
        
        var options = {
            method: 'GET',
            url: '/v1/alerts/99999'
        };
        
        it('returns 404 when task isn\'t found', function (done) {
            server.inject(options, function (response) {
                response.statusCode.should.be.exactly(404);
                done();
            });
        });
        
        it('validates id in url parameter', function (done) {
            options.url = '/v1/alerts/69915';
            server.inject(options, function (response) {
                response.statusCode.should.be.exactly(200);
                response.result.id.should.be.exactly(69915);
                response.result.severity.should.be.exactly(3);
                response.result.closed.should.be.exactly(0);
                response.result.origin.should.be.exactly('system');
                response.result.plugin_name.should.be.exactly('KANKEI_NAI');
                done();
            });
        });

    });

    describe('POST /v1/alerts', function () {
        
        var options = {
            method: 'POST', 
            url: '/v1/alerts'
        };
        
        var payload = {
            "severity": 7,
            "closed": 1,
            "origin": "system"
        };

        it('fails when there\'s no payload', function (done) {
            
            server.inject(options, function (response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('fails with an invalid payload', function (done) {
            options.payload = {};
            server.inject(options, function (response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('returns an object after creating new alert', function (done) {
            options.payload = payload;
            server.inject(options, function (response) {
                response.result.should.be.an.instanceOf.Object;
                response.result.severity.should.be.exactly(payload.severity);
                response.result.closed.should.be.exactly(payload.closed);
                response.result.origin.should.be.exactly(payload.origin);
                done();
            });
        });

    });
    
    describe('PUT /v1/alerts/{id}', function () {
        
        var getOptions = {
            method: 'GET',
            url: '/v1/alerts/75866'
        };
        
        var putOptions = {
            method: 'PUT',
            url: '/v1/alerts/75866',
            payload: {
                "severity": 8,
                "closed": 0,
                "origin": "system"
            }
        };
        
        var returnInitialState = function (done) {
            putOptions.payload.severity = 3;
            server.inject(putOptions, function (res) {
                done();
            });
        };

        it('successfully updates alert severity', function (done) {
            var updateItem = function () {
                server.inject(putOptions, function (res) {
                    res.statusCode.should.be.exactly(200);
                    res.result.id.should.be.exactly(75866);
                    res.result.severity.should.be.exactly(8);
                    returnInitialState(done);
                });
            };
            
            server.inject(getOptions, function (response) {
                response.statusCode.should.be.exactly(200);
                response.result.id.should.be.exactly(75866);
                response.result.severity.should.be.exactly(3);
                updateItem();
            });
        });
    });
    
    describe('DELETE /v1/alerts/{id}', function () {

        var alertID = null;
        var deleteOptions = {
            method: 'DELETE',
            url: '/v1/alerts/'
        };

        beforeEach(function (done) {
            var options = {
                method: 'POST', 
                url: '/v1/alerts',
                payload: {
                    "severity": 7,
                    "closed": 1,
                    "origin": "system"
                }
            };

            server.inject(options, function (response) {
                console.log(response.result.alertId);
                alertID = response.result.alertId;
                done();
            });
        });

        it('returns a status code of 200 when sucessful', function (done) {
            deleteOptions.url = deleteOptions.url + alertID;
            server.inject(deleteOptions, function (response) {
                response.statusCode.should.be.exactly(200);
                done();
            });
        });

    });

});