//Directive communication through Publisher Subscriber
'use strict';
var app = angular.module("app", []);

//Parent Controller

app.controller('parentCtrl', function($scope, $log) {

  var listOfSubscribers = [];

  function publish(msg){
    for (var i=0; i < listOfSubscribers.length; i++){
      if (listOfSubscribers[i]){
        listOfSubscribers[i].say(msg);
        $log.log("message is sent to subscriber # " + i);
      }
    }
  }

  $scope.publish = function(msg){
    publish(msg)
  };

  $scope.subscribe = function(obj){
    var indexOfNewSubscriber =listOfSubscribers.push(obj)-1;
    $log.info("subscriber # " + indexOfNewSubscriber + " is added");
    return indexOfNewSubscriber;
  }

  $scope.unsubscribe = function(index){
    delete listOfSubscribers[index];
    $log.warn("subscriber # " + index + " is removed");
  }
});

//Directive - 1 publisher

app.directive( 'drctv1', function($log) {
  return {
    restrict: 'E',
    scope: {
      publish: '&'
    } ,
    template: '<input type="text" ng-model="obj.msg"/><button ng-click="clicked()">publish</button>',
    controller: function($scope){
      $scope.obj = {};
      $scope.clicked = function(){
        $scope.publish({msg: $scope.obj.msg});
      }
    }
  };
});

//Directive - 2 subscriber

app.directive( 'drctv2', function($log) {
  return {
    restrict: 'E',
    scope: {
      subscribe: '&',  // function parameter
      unsubscribe: '&'
    } ,
    template: '<span>{{msg}}</span>',
    controller: function($scope){
      this.say = function(msg){
        $scope.msg = msg;
      };

      $scope.index = $scope.subscribe({obj: this}); //subscribe me

      $scope.$on("$destroy", function() {
        $scope.unsubscribe({index: $scope.index}); //subscribe me
      });

    }
  };
});


