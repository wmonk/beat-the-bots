var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/start', function(req, res) {
  res.send('starting');
});

module.exports = router;
