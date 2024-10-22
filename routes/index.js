var express = require('express');
const { route } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router
