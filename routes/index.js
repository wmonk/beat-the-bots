var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
	var game = require('../lib/game').current();

	res.json(game);
});

router.get('/reset', function (req, res) {
	var game = require('../lib/game').current();

	if (!game) {
		return res.status(404).send('no game started');
	}

	game.reset();


	res.status(200).send('reset');
});

module.exports = router;
