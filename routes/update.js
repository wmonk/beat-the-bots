var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/update', function(req, res) {
  res.send('updating');
});

module.exports = router;
