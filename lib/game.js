var cards = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
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
		}

		return 'BET';
	};

	game.update = function (opts) {
		for (var key in opts) {
			game[key] = opts[key];
		}
	};

	game.reset = function () {
		game = undefined;
	};
};
