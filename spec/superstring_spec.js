/* global describe, it */

'use strict';

var router = new (require('../'))().listen(),
	request = require('supertest')(router._server);

describe('router', function () {
	router.when('a', function (req, res) {
		res.statusCode = 200;
		res.end('a');
	});

	it('should route to a', function (done) {
		request
			.get('/')
			.set('host', 'a')
			.expect(200)
			.expect('a')
			.end(done);
	});

	it('should route to b.a', function (done) {
		request
			.get('/')
			.set('host', 'b.a')
			.expect(200)
			.expect('a')
			.end(done);
	});

	it('should not route to superstring ab', function (done) {
		request
			.get('/')
			.set('host', 'ab')
			.expect(404)
			.end(done);
	});
});
