var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/move', function(req, res) {
  res.send('moving');
});

module.exports = router;
