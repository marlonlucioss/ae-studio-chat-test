angular.module('myApp', ['io.service']).

run(function (io) {
  io.init({
    ioServer: 'http://localhost:3696'
  });
}).

controller('MainController', function ($scope, io) {

  var message_model = {
    text : '',
    date : null
  };

  $scope.message = null;
  $scope.messages = [];

  $scope.send = function () {
    if (!$scope.message || $scope.message === '') return;
    var message = angular.copy(message_model);
    message.text = $scope.message;
    message.date = new Date();
    io.emit(message);
    $scope.message = null;
  };

  io.watch('event.message', function (message) {
    $scope.messages.push(message);
    $scope.$apply();
  });

});
