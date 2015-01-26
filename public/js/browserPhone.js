$(function () {
  function init() {
    //トークン取得
    $.ajax({
      type: 'POST',
      scriptCharset: 'utf-8',
      dataType: 'json',
      url:'/browser-phone/create-token',
      success: function (res) {
        Twilio.Device.setup(res.token, {debug: true});
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
 
  Twilio.Device.ready(function (device) {
    $("#log").text("Ready");
  });

  Twilio.Device.error(function (error) {
    $("#log").text("Error: " + error.message);
  });
 
  //接続
  Twilio.Device.connect(function (conn) {
    $("#log").text("Successfully established call");
  });
 
  //通話終了
  Twilio.Device.disconnect(function (conn) {
    $("#log").text("Call ended");
  });
 
  //着信時
  Twilio.Device.incoming(function (conn) {
    $("#log").text("Incoming connection from " + conn.parameters.From);
      conn.accept();
  });
 
  //通話ボタン
  $("#call").click(function () {
    var number = $("#number").val();
    var params = { "phoneNumber": number };
    Twilio.Device.connect(params);
  });
 
  //通話ボタン
  $("#hangup").click(function () {
    //通話終了
    Twilio.Device.disconnectAll();
  });
 
  //初期化実行
  init();
});



// $(function(){
//   //ready状態になった時に実行
//   Twilio.Device.ready(function (device) {
//     $("#log").text("Ready");
//   });
//   //エラー状態になった時に実行
//   Twilio.Device.error(function (error) {
//     $("#log").text("Error: " + error.message);
//   });
//   //接続状態になった時に実行
//   Twilio.Device.connect(function (conn) {
//     $("#log").text("Successfully established call");
//   });
//   //通話終了した時に実行
//   Twilio.Device.disconnect(function (conn) {
//     $("#log").text("Call ended");
//   });

//   //Callボタン
//   $("#call").click(function () {
//     //トークン取得
//     $.ajax({
//       type: 'POST',
//       scriptCharset: 'utf-8',
//       dataType: 'json',
//       url: '/browser-phone/create-token',
//       success: function (res) {
//         //トークンをセットしてデバイスのセットアップ＆接続
//         Twilio.Device.setup(res.token, {debug: true});
//         Twilio.Device.connect();
//       },
//       error: function (err) {
//         console.log(err);
//       }
//     });
//   });

//   //Hangupボタン
//   $("#hangup").click(function () {
//     //通話終了
//     Twilio.Device.disconnectAll();
//   });
// });