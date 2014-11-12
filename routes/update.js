var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/update', function (req, res) {
	var currentGame = require('../lib/game').current();
	res.send('updating');
});

module.exports = router;
