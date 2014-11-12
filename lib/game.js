var chalk = require('chalk');
var cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
var game;

module.exports.current = function () {
	return game;
};

module.exports.startNew = function (opts) {
	game = {
		handCount: 0
	};
	game.moves = [];

	var strategy = require('../lib/progressiveBettingStrategy');

	for (var key in opts) {
		game[key] = opts[key];
	}

	game.fold = function () {
		console.log(chalk.green('Move:'), chalk.grey('FOLD'));
		return 'FOLD';
	};

	game.bet = function (amount) {
		console.log(chalk.green('Move:'), chalk.grey('BET'), chalk.gray('Amount:'), chalk.blue(amount));
		game.chips -= amount;
		return 'BET:' + amount;
	};

	game.move = function () {
		game.handCount++;
		return strategy(game);
	};

	game.update = function (opts) {
		for (var key in opts) {
			game[key] = opts[key];
		}
	};

	game.postBlind = function () {
		game.chips--;
	};

	game.receiveChips = function (chipsRecieved) {
		game.chips += chipsRecieved;
	};

	game.reset = function () {
		game = undefined;
	};

	game.lastMove = function (move) {
		game.moves.push(move);
	};
};
