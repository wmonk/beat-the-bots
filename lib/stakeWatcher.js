var maxStakes = {
	'J': 5,
	'Q': 10,
	'K': 15,
	'A': 30
}

var progressiveBettingStrategy = function (game) {
	var cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

	var val = cards.indexOf(game.card);

	if (val < 3) {
		return game.fold();
	} else if (val >= cards.indexOf('J')) {
		var amountToBet = val - cards.indexOf('J') + 1;
		if (games.stakes + amountToBet > maxStakes[game.card]) {
			if (game.stakes > (game.chips / 2)) {
				return game.fold();
			}
			return game.call();
		}
		return game.bet(amountToBet);
	}

	if ((games.stakes + 1) > maxStakes[game.card]) {
		return game.call();
	}
	return game.bet(1);
};

module.exports = progressiveBettingStrategy;
