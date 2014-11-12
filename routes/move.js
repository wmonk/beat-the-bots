var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/move', function (req, res) {
	var game = require('../lib/game').current();

	if (!game) {
		return res.status(404).send('no game started');
	}

	var move = game.move();
	game.moves.push('>> ' + move);
	res.set('Content-Type', 'text/plain');
	res.send(move);
});

module.exports = router;
