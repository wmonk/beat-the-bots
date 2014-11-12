var foldOrBet = require('../../lib/foldOrBets.js');
describe('Fold Or Bet Betting Strategy', function() {
	
	it('should fold for anything under a 5 ', function(done) {	
		var game = {}
		game.fold =function(){
			done();
		}
		game["card"] = '2';
		foldOrBet(game);
	});	

	it('should call for mid card ', function(done) {	
		var game = {}
		game.call =function(){
			done();
		}
		game["card"] = '6';		
		foldOrBet(game);
	});	

	it('should raise for anything over J upto 40', function(done) {	
		var game = {}
		game.stakes =25
		game.bet =function(amount){
			if (amount==15){
				done();
			}			
		}
		game["card"] = 'J';
		foldOrBet(game);
	});	

	it('should go bust with an ace', function(done) {	
		var game = {}
		game.stakes =35
		game.bet =function(amount){
			if (amount>21){
				done();
			}			
		}
		game["card"] = 'A';
		foldOrBet(game);
	});	


});
