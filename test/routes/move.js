var request = require('supertest');
var express = require('express');
var	moveRoutes = require('../../routes/move');
var startGame = require('../../routes/start');
var app;
var server;

describe('Move routes', function() {
	beforeEach(function (done) {
		app = express();

		app.use(moveRoutes);
		app.use(startGame);

		server = request(app);

		app.use(function (req, res) {
			res.status(404).send('404');
		});

		done();
	});

	it('should 404 if there is no current game', function(done) {
		server
			.get('/move')
			.expect(404)
			.expect(/no game started/)
			.end(done);
	});

	it('should respond /move', function(done) {
		server
			.post('/start')
			.expect(200)
			.end(function () {
				server
					.get('/move')
					.expect(200)
					.end(done);
			});
	});
});
