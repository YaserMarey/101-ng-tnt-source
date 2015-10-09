//Directive communicating through sharing $rootScope acting as an events bus
'use strict';
var app = angular.module("app", []);

//Directive - 1

app.directive( 'drctv1', function() {
  return {
    restrict: 'E',
    scope:{}, //isolated Scope
    template: '<input type="text" ng-model="data.message"/></br><button ng-click="sendMessage(data)">send message</button>',
    controller: function($scope, $rootScope){
      $scope.sendMessage = function(data){
        $rootScope.$emit("DRCTV_ONE_EVENT", data);
      }
    }
  }
});

//Directive -2

app.directive( 'drctv2', function($rootScope) {
  return {
    restrict: 'E',
    scope: {}, //isolated Scope
    template: '<span>{{data.message}}</span> ',
    link: function(scope, elm, attrs) {
      scope.data = {message:""};
      $rootScope.$on("DRCTV_ONE_EVENT", function(event, data){
                      scope.data.message = data.message; });
    }
  }
});
