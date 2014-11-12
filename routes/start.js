var express = require('express');
var router = express.Router();
var game = require('../lib/game');
var chalk = require('chalk');

/* GET users listing. */
router.post('/start', function (req, res) {
	var bot = req.param('OPPONENT_NAME');
	var chips = req.param('STARTING_CHIP_COUNT');
	var hands = req.param('HAND_LIMIT');

	console.log(chalk.gray('Bot name: '), chalk.cyan(bot), '\t', chalk.gray('Chip count:'), chalk.green(chips), '\t', chalk.gray('Hands to play: '), chalk.blue(hands));

	game.startNew({
		opponent: bot,
		chips: chips,
		hands: hands
	});

	res.send('starting');
});

module.exports = router;
