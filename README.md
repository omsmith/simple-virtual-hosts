# simple-virtual-hosts

[![Build Status](https://travis-ci.org/omsmith/simple-virtual-hosts.png?branch=master)](https://travis-ci.org/omsmith/simple-virtual-hosts) [![Coverage Status](https://coveralls.io/repos/omsmith/simple-virtual-hosts/badge.png?branch=master)](https://coveralls.io/r/omsmith/simple-virtual-hosts?branch=master)

A simple hostname router

## Example
```
'use strict';

var VirtualHosts = require('simple-virtual-hosts');

var vhost = new VirtualHosts()
	.when('example.com', serveWeb)
	.when('api.example.com', serveApi)
	.default(serveDefault);

require('http')
	.createServer(vhost.dispatch)
	.listen(10000);

function serveWeb (req, res) {
	console.log('web!');
	res.statusCode = 200;
	res.end();
}

function serveApi (req, res) {
	console.log('api!');
	res.statusCode = 200;
	res.end();
}

function serveDefault (req, res) {
	console.log('default!');
	res.statusCode = 200;
	res.end();
}
```
