"use strict";

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var server = require('../../');
var should = require('should');

var deviceModel = require('../../src/models/device');

describe('Device routes', function () {
    
    describe('GET /v1/devices', function () {
        
        var options = {
            method: 'GET',
            url: '/v1/devices'
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
    
    describe('GET /v1/devices/{id}', function () {
        
        var options = {
            method: 'GET',
            url: '/v1/devices/99999'
        };
        
        it('returns 404 when task isn\'t found', function (done) {
            server.inject(options, function (response) {
                response.statusCode.should.be.exactly(404);
                done();
            });
        });
        
        it('validates id in url parameter', function (done) {
            options.url = '/v1/devices/13';
            server.inject(options, function (response) {
                response.statusCode.should.be.exactly(200);
                response.result.id.should.be.exactly(13);
                response.result.name.should.be.exactly('SuperSamA.sevone.com');
                response.result.name_masked.should.be.exactly('SuperSamA');
                response.result.mgt_address.should.be.exactly('192.168.30.5');
                done();
            });
        });

    });
    
});