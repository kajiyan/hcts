var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  // res.send('hello world');
  console.log(req.body);
  res.send(req.body);
  // res.render('index.swig.html', { title: 'Express' });
  // res.send(req.body);
  // res.send('respond with a resource');
});

module.exports = router;
