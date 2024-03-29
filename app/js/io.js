angular.module('io.service', []).
factory('io', function ($http) {
  var socket,
    ioServer,
    ioRoom,
    watches = {};

  return {
    init: function (conf) {
      ioServer = conf.ioServer;
      ioRoom = conf.ioRoom;

      socket = io.connect(conf.ioServer);
      socket.on('event.response', function (data) {
        if (data.room === ioRoom) {
          return watches['event.message'](data.message);
        }
      });

        socket.on('event.subscribe', function (data) {
            var message = data;
            if (data.room === ioRoom) {
                return watches['event.subscribe'](data.message);
            }
        });

    },

    subscribe: function () {
      socket.emit('event.subscribe', ioRoom);
    },

    emit: function (arguments) {
      socket.emit('event.message', {
        room: ioRoom,
        message: arguments
      });
    },

    watch: function (item, data) {
      watches[item] = data;
    },

    unWatch: function (item) {
      delete watches[item];
    }
  };
});
