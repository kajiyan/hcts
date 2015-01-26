var express = require('express');
var router = express.Router();

// ブラウザフォン画面
router.get('/', function(req, res) {
  res.render('browser-phone.swig.html', {});
});

// ケイパビリティトークン生成
router.post('/create-token', function(req, res) {
  var app = module.parent.exports;
  var twilio = app.get('twilio');
  var twilioAccountSid = app.get('twilioAccountSid');
  var twilioAuthToken = app.get('twilioAuthToken');

  // アプリケーションSID
  var appSid = 'AP912fdd87858219ba28038d68d8200b38'; // test-dial-browser

  var capability = new twilio.Capability(twilioAccountSid, twilioAuthToken);
  capability.allowClientOutgoing(appSid);
  capability.allowClientIncoming('dev');
  var token = capability.generate();
  console.log("token:", token);
  res.writeHead(200, {'content-type': 'text/json'});
  res.end(JSON.stringify({'token': token}));

  // ^[\d\+\-\(\) ]+$

  // var app = module.parent.exports;
  // var twilio = app.get('twilio');
  // var twilioAccountSid = app.get('twilioAccountSid');
  // var twilioAuthToken = app.get('twilioAuthToken');

  // // テスト用SID
  // var appSid = "APabe7650f654fc34655fc81ae71caa3ff";
  
  // // ACCOUNT_SIDとAUTH_TOKENは自分の環境のものを設定
  // var capability = new twilio.Capability(twilioAccountSid, twilioAuthToken);
  // capability.allowClientOutgoing(appSid);
  // var token = capability.generate();
  // res.writeHead(200, {'content-type': 'text/json'});
  // res.end(JSON.stringify({'token': token}));
});

//ブラウザがダイアルされるように
router.post('/dial-browser', function(req, res) {
  var app = module.parent.exports;
  var twilio = app.get('twilio');
  
  // POST を取得
  var post = req.body;

  var twimlResponse = new twilio.TwimlResponse();

  if (typeof post.phoneNumber !== "undefined" &&
      post.phoneNumber !== null &&
      typeof post.phoneNumber.match(/^[\d\+\-\(\) ]+$/) !== "undefined" &&
      post.phoneNumber.match(/^[\d\+\-\(\) ]+$/) !== null) {
    console.log('電話番号が入力されていた時の処理');
    // 電話番号が入力されていた時の処理
    twimlResponse
      .say(
        "これはテストです。",
        {
          voice: 'woman',
          language: 'ja-jp'
        }
      )
      .dial(
        {
          callerId: '+815031540381'
        },
        function(node) {
          node.number(post.phoneNumber);
        }
     );
  } else {
    console.log('電話を受信した場合のTwiMLを生成');
    // 電話を受信した場合のTwiMLを生成
    twimlResponse.dial(function(){
      this.client('dev');
    });
  }
 
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twimlResponse.toString());
});



// ブラウザからの発信
// post ni
router.post('/dial-sender', function(req, res) {
  console.log('dial-sender');
  var app = module.parent.exports;
  var twilio = app.get('twilio');

  // POST を取得
  var post = req.body;

  var twimlResponse = new twilio.TwimlResponse();
  
  twimlResponse
    .say(
      "これはテストです。",
      {
        voice: 'woman',
        language: 'ja-jp'
      }
    )
    .dial(
      {
        callerId: '+815031540381'
      },
      function(node) {
        node.number(post.phoneNumber);
      }
    );


  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twimlResponse.toString());
});










module.exports = router;