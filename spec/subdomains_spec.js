/* global describe, it */

'use strict';

var router = new (require('../'))().listen(),
	request = require('supertest')(router._server);

describe('router', function () {
	var domains = ['a', 'b.a', 'c.b.a'];

	domains.forEach(function (domain) {
		router.when(domain, function (req, res) {
			res.statusCode = 200;
			res.end(domain);
		});
	});

	domains.forEach(function (domain) {
		it ('should route to ' + domain, function (done) {
			request
				.get('/')
				.set('host', domain)
				.expect(200)
				.expect(domain)
				.end(done);
		});

		it ('should route to subdomain z of ' + domain, function (done) {
			request
				.get('/')
				.set('host', 'z.' + domain)
				.expect(200)
				.expect(domain)
				.end(done);
		});
	});
});
