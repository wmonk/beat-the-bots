var cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
var game;
module.exports.current = function () {
	return game;
};

module.exports.startNew = function (opts) {
	game = {};

	for (var key in opts) {
		game[key] = opts[key];
	}

	game.move = function () {
		var val = cards.indexOf(game.card);

		if (val < 3) {
			return 'FOLD';
		} else if (val >= indexOf('J')) {
			var amountToBet = val - indexOf('J') + 1;
			chips -= amountToBet;
			return 'BET:' + amountToBet;
		}

		game.chips--;
		return 'BET';
	};

	game.update = function (opts) {
		for (var key in opts) {
			game[key] = opts[key];
		}
	};

	game.postBlind = function () {
		game.chips--;
	}

	game.receiveChips = function (chipsRecieved) {
		game.chips += chipsRecieved;
	}

	game.reset = function () {
		game = undefined;
	};
};
