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
		return 'BET';
	};

	game.reset = function () {
		game = undefined;
	};
};
