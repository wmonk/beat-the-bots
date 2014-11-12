var maxStakes = {
	'J': 10,
	'Q': 25,
	'K': 50,
	'A': 150
}

var playedANeg = false;

var progressiveBettingStrategy = function (game) {
	var cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

	var val = cards.indexOf(game.card);
	if (val === 0 && playedANeg) {
		playedANeg = true;
		return game.bet(-1);
	}
	if (val < 6) {
		return game.fold();
	} else if (val >= cards.indexOf('J')) {

		var amountToBet = 5 + Math.round((val - cards.indexOf('J') + 1) * 7 * Math.random());

		var riskyTerritory = game.stakes + amountToBet > maxStakes[game.card];

		if (riskyTerritory) {
			if (game.stakes > (game.chips / 2)) {
				return game.fold();
			}
			return game.call();
		}
		return game.bet(amountToBet);
	}

	if ((game.stakes + 1) > (maxStakes[game.card] || 5)) {
		return game.call();
	}
	return game.bet(1);
};

module.exports = progressiveBettingStrategy;
