var game;
module.exports.current = function () {
	return game;
}

module.exports.startNew = function () {
	game = {
		move: function () {
			return 'BET';
		}
	};
}
