var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var app = module.parent.exports;
  var client = app.get('twilio');

  // var dgram = app.get('dgram');
  
  // var oscmin = app.get('oscmin');

  // sendHeartbeat = function() {
  //   var udp = dgram.createSocket('udp4');
  //   var buf;
  //   buf = oscmin.toBuffer({
  //     address: "/heartbeat",
  //     args: [
  //       12,
  //       "sttttring",
  //       new Buffer("beat"),
  //       {
  //         type: "integer",
  //         value: 7
  //       }
  //     ]
  //   });
  //   return udp.send(buf, 0, buf.length, 30000, "localhost", function(err) {
  //     console.log("send");
  //   });
  // };

  // setInterval(sendHeartbeat, 2000);



  // console.log(app.get('socketio'));


  // client.calls.create({
  //   url: 'http://demo.twilio.com/docs/voice.xml',
  //   to: '+819017551440',
  //   from: '+815031540381',
  //   statusCallback: 'http://54.65.140.79:3000/recording-callback',
  //   statusCallbackMethod: 'POST', 
  //   record: true // 録音をする
  // }, function(err, call) {
  //   process.stdout.write(call.sid);
  // });

  res.render('index.swig.html', { title: 'Express' });
});

router.get('/socket', function(req, res, next) {
  console.log(app.get('socketio'));
  // res.end("socket API");
});

module.exports = router;
