# simple-virtual-hosts

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
