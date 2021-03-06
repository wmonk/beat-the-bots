var willsStrategy = function (game) {
	var cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

	var val = cards.indexOf(game.card);

	if (val < 3) {
		return game.fold();
	} else if (val >= cards.indexOf('J')) {
		var amountToBet = val - cards.indexOf('J') + 1;
		return game.bet(amountToBet);
	}

	return game.bet(1);
};

module.exports = willsStrategy;
