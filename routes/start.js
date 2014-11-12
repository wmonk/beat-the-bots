var express = require('express');
var router = express.Router();
var game = require('../lib/game');

/* GET users listing. */
router.post('/start', function (req, res) {
	game.startNew();

	res.send('starting');
});

module.exports = router;
