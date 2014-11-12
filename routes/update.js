var express = require('express');
var router = express.Router();
var chalk = require('chalk');

/* GET users listing. */
router.post('/update', function (req, res) {
	var game = require('../lib/game').current();
	if (!game) {
		return res.status(404).send('no game started');
	}

	var command = req.param('COMMAND');
	var data = req.param('DATA');

	console.log(chalk.gray('Command:'), chalk.green(command), chalk.gray('Data:'), chalk.blue(data));

	switch (command) {
	case 'RECEIVE_BUTTON':

		break; // we do a move
	case 'POST_BLIND':
		game.postBlind();
		break; // 1 chip removed
	case 'CARD':
		game.newCard(data);
		break; // what card we are assigend
	case 'OPPONENT_MOVE':
		game.lastMove(data);
		break; // opponent move
	case 'RECEIVE_CHIPS':
		game.receiveChips(parseInt(data));
		break; // chips recieved 0 = lost, X = wond
	case 'OPPONENT_CARD':
		console.log(chalk.gray('Cards played:', chalk.blue(JSON.stringify(game.cardsPlayed))));
		game.cardPlayed(data);
		break; //
	}

	res.send('updating');
});

module.exports = router;
