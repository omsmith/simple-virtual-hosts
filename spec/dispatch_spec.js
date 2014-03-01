/* global describe, it, before */

'use strict';

var router = new (require('../'))(),
	request = require('supertest')(require('http').createServer(router.dispatch));

describe('router.dispatch', function () {
	before(function (done) {
		router.when('localhost', function (req, res) {
			res.statusCode = 200;
			res.end('so dispatch');
		});

		done();
	});

	it('should function as a request handler for a server', function (done) {
		request
			.get('/')
			.set('host', 'localhost')
			.expect(200)
			.expect('so dispatch')
			.end(done);
	});
});
