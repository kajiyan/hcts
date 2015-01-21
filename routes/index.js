var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var app = module.parent.exports;
  var client = app.get('twilio');

  // client.calls.create({
  //   url: "http://demo.twilio.com/docs/voice.xml",
  //   to: '+819017551440',
  //   from: '+815031540381'
  // }, function(err, call) {
  //   process.stdout.write(call.sid);
  // });

  res.render('index.swig.html', { title: 'Express' });
});

module.exports = router;
