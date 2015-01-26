// ============================================================
// Socket Controller
module.exports = function(socket){
  var app = require('../../app');

  console.log("Socket Bridge");

  socket.on('connection', function (socket) {
    console.log('connection');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    // room = 'testRoom' + Date.now();

    // socket.join(room);
    // console.log('コネクション数', socket.client.conn.server.clientsCount);

    // // ソケット通信が切断された時
    // socket.on('disconnect', function() {
    //   console.log('disconnected');
    // });
  });
};