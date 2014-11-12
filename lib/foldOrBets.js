var foldOrBet = function(game){
	var cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

	var val = cards.indexOf(game.card);

	if (val < 3) {
		return game.fold();
	}
	if (val < 8) {
		return game.call();
	}
	if (game.stakes > 40 ){
		return game.call()
	}
	return game.bet(40-game.stakes)

}
module.exports = foldOrBet