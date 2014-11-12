var request = require('supertest');
var express = require('express');
var	updateRoutes = require('../../routes/update');
var app;
var server;

describe('Update routes', function() {
	beforeEach(function (done) {
		app = express();

		app.use(updateRoutes);

		server = request(app);

		done();
	});

	it('should respond to test', function(done) {
		server
			.post('/update')
			.expect(200)
			.expect(/updating/)
			.end(done);
	});
});
