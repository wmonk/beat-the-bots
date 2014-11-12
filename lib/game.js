var chalk = require('chalk');
var cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
var game;

module.exports.current = function () {
	return game;
};

module.exports.startNew = function (opts) {
	game = {
		moveCount: 0
	};
	game.moves = [];
	game.cardsPlayed = {};

	var strategy = require('../lib/stakeWatcher');

	for (var key in opts) {
		game[key] = opts[key];
	}

	game.fold = function () {
		console.log(chalk.green('Move:'), chalk.grey('FOLD'));
		return 'FOLD';
	};

	game.call = function () {
		console.log(chalk.green('Move:'), chalk.grey('CALL'));
		return 'CALL';
	}

	game.bet = function (amount) {
		console.log(chalk.green('Move:'), chalk.grey('BET'), chalk.gray('Amount:'), chalk.blue(amount));
		game.chips -= amount;
		game.stakes += amount;
		return 'BET:' + amount;
	};

	game.move = function () {
		game.moveCount++;
		// var lastMove = game.lastMove[game.lastMove.length - 1];
		// if (lastMove.indexOf('BET:') > -1) {
		// 	var betAmount = lastMove.match(/(\d+)/);

		// 	if (betAmount > 5) {
		// 		return game.fold();
		// 	}
		// }

		game.handCount++;
		return strategy(game);
	};

	game.newCard = function (card) {
		game.card = card;
		game.stakes = 0;

		game.moves.push('----');

		if (game.cardsPlayed[card]) {
			game.cardsPlayed[card]++;
		} else {
			game.cardsPlayed[card] = 1;
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
		var betRegex = /BET:(\d+)/;
		if (move === 'BET') {
			game.stakes++;
		} else {
			if (betRegex.test(move)) {
				var amount = betRegex.exec(move)[1];
				game.stakes += parseInt(amount);
			}
		}
		game.moves.push(move);
	};

	game.cardPlayed = function (card) {
		if (game.cardsPlayed[card]) {
			game.cardsPlayed[card]++;
		} else {
			game.cardsPlayed[card] = 1;
		}
	};
};
