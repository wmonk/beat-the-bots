var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/update', function (req, res) {
	var currentGame = require('../lib/game').current();
	if (!currentGame) {
		return res.status(404).send('no game started');
	}

	var command = req.param('COMMAND');
	var data = req.param('DATA');

	if (command === 'CARD') {
		currentGame.update({
			card: data
		});
	}

	res.send('updating');
});

module.exports = router;
