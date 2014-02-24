'use strict';

var Router = require('./router');

module.exports = VirtualHosts;

function VirtualHosts () {
	this._router = new Router();

	this.dispatch = VirtualHosts.prototype.dispatch.bind(this);
}

VirtualHosts.prototype.when = function () {
	this._router.when.apply(this._router, arguments);
	return this;
};

VirtualHosts.prototype.default = function () {
	this._router.default.apply(this._router, arguments);
	return this;
};

VirtualHosts.prototype.dispatch = function () {
	this._router.dispatch.apply(this._router, arguments);
};
