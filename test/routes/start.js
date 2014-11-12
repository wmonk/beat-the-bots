var request = require('supertest');
var express = require('express');
var	startRoutes = require('../../routes/start');
var app;
var server;

describe('Start routes', function() {
	beforeEach(function (done) {
		app = express();

		app.use(startRoutes);

		server = request(app);

		done();
	});

	it('should respond to test', function(done) {
		server
			.post('/start')
			.expect(200)
			.expect(/starting/)
			.end(done);
	});
});
