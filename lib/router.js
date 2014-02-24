'use strict';

module.exports = Router;

function Router () {
	this._hosts = [];
	this._handlers = {};
	this._default = undefined;
}

Router.prototype.when = function (host, handler) {
	var handlers = this._handlers,
		hosts = this._hosts;

	host = host
		.replace(/^\.(.*)$/, '$1')
		.replace(/\./g, '\\.');

	if (!handlers[host]) {
		var regex = new RegExp('(^|(.+\\.))' + host + '$');
		console.log(regex);
		var hostMeta = {
			host: host,
			test: regex.test.bind(regex),
			parts: host.split('.').length
		};

		hosts.push(hostMeta);

		if (hosts.length > 1) {
			hosts.sort(function (a, b) {
				return b.parts - a.parts;
			});
		}
	}

	handlers[host] = handler;

	return this;
};

Router.prototype.default = function (handler) {
	this._default = handler;
	return this;
};

Router.prototype.dispatch = function (req, res) {
	var reqHost = req.headers.host.split(':')[0],
		matchedHost;

	this._hosts.some(function (host) {
		if (host.test(reqHost)) {
			matchedHost = host.host;
			return true;
		}

		return false;
	});

	var handler = this._handlers[matchedHost] || this._default;
	if (handler) {
		handler(req, res);
		return;
	}

	res.statusCode = 404;
	res.end();
};
