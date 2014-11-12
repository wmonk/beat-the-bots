var request = require('supertest');
var express = require('express');
var indexRoutes = require('../../routes/index');
var startRoutes = require('../../routes/start');
var bodyParser = require('body-parser');
var app;
var server;

describe('Start routes', function () {
	beforeEach(function (done) {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: false
		}));

		app.use(indexRoutes);
		app.use(startRoutes);

		server = request(app);

		done();
	});

	it('should respond to test', function (done) {
		server
			.post('/start')
			.expect(200)
			.expect(/starting/)
			.end(done);
	});

	it('should save the game states', function (done) {
		server
			.post('/start')
			.send({
				'OPPONENT_NAME': 'bot buster',
				'HAND_LIMIT': '301123',
				'STARTING_CHIP_COUNT': '2133'
			})
			.expect(200)
			.expect(/starting/)
			.end(function () {
				server
					.get('/')
					.expect({
						opponent: "bot buster",
						chips: "2133",
						hands: "301123",
						moveCount: 0,
						moves: [],
						cardsPlayed: {}
					})
					.end(done);
			});
	});

	it.skip('should update the chip count', function (done) {
		server
			.post('/start')
			.send({
				'OPPONENT_NAME': 'bot buster',
				'HAND_LIMIT': '301123',
				'STARTING_CHIP_COUNT': '1000'
			});
		server
			.post('/update')
			.send({
				'RECEIVE_CHIPS': '50'
			})
			.expect(/starting/)
			.end(function () {
				server
					.get('/')
					.expect({
						opponent: "bot buster",
						chips: "1050",						
						hands: "301123",						
						moveCount: 0
					})
					.end(done);
			});
	});

});
