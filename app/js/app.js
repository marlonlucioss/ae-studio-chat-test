angular.module('myApp', ['io.service']).

run(function (io) {
  io.init({
    ioServer: 'http://localhost:3696'
  });
}).

controller('MainController', function ($scope, io) {

  var message_model = {
    text : '',
    date : null,
    username : null
  };

  $scope.username = null;
  $scope.send_disabled = true;

  $scope.message = null;
  $scope.messages = [];

  $scope.send = function () {
    if (!$scope.message || $scope.message === '') return;
    var message = angular.copy(message_model);
    message.text = $scope.message;
    message.username = $scope.username;
    message.date = new Date();
    io.emit(message);
    $scope.message = null;
    setFocusOnField();
  };

  var message_input = document.getElementById('message-field');

  function setFocusOnField(){
    message_input.focus();
  }

  $scope.confirmNickName = function(){
    $scope.send_disabled = false;
  };

  io.watch('event.message', function (message) {
    console.log(message);
    $scope.messages.push(message);
    $scope.$apply();
  });

});
