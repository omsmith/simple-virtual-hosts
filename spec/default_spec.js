/* global describe, it, before */

'use strict';

var router = new (require('../'))().listen(),
	request = require('supertest')(router._server);

describe('router', function () {
	before(function (done) {
		router
			.when('localhost', function (req, res) {
				res.statusCode = 200;
				res.end('localhost');
			})
			.default(function (req, res) {
				res.statusCode = 200;
				res.end('default');
			});

		done();
	});

	it('should route to default if no other match', function (done) {
		request
			.get('/')
			.set('host', 'steak')
			.expect(200)
			.expect('default')
			.end(done);
	});

	it('should still match other hosts', function (done) {
		request
			.get('/')
			.set('host', 'localhost')
			.expect(200)
			.expect('localhost')
			.end(done);
	});
});
