var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title_name: 'Video Insights - To detect scenes and enhance the way you watch videos' });
});

module.exports = router;
