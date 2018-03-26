var express = require('express');
var server = require('http').createServer(app);
var app = express();
var io = require('socket.io')(server);

var port = 3696;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {

  socket.events = {};

  socket.on('event.message', function (payload) {
    io.emit('event.response', payload);
  });

  socket.on('event.subscribe', function (room) {
    socket.join(room);
  });

  socket.on('event.unsubscribe', function (room) {
    socket.leave(room);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected...');
  });

});
