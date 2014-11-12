var game = require('../../lib/game.js')
describe('Game Book keeping', function() {
	
	it('should deduct any chips that are bet', function(done) {	
	game.startNew({
		opponent: "bot",
		chips: 100,
		hands: 300
	});
	var currentGame = game.current();	
		currentGame.bet(30)
		if(currentGame.chips == 70){
			done()
		}
	});	
});
