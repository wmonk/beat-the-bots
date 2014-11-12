var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/move', function (req, res) {
	var game = require('../lib/game').current();
	var move = game.move();
	res.send(move);
});

module.exports = router;
