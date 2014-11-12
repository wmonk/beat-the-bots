var request = require('supertest');
var express = require('express');
var	moveRoutes = require('../../routes/move');
var app;
var server;

describe('Move routes', function() {
	beforeEach(function (done) {
		app = express();

		app.use(moveRoutes);

		server = request(app);

		done();
	});

	it('should respond to test', function(done) {
		server
			.get('/move')
			.expect(200)
			.expect(/moving/)
			.end(done);
	});
});
