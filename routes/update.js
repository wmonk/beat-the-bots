var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/update', function (req, res) {
	var currentGame = require('../lib/game').current();

	if (!currentGame) {
		return res.status(404).send('no game started');
	}

	res.send('updating');
});

module.exports = router;
