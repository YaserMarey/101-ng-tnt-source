//Directive communication through Shared Object on Parent Scope
'use strict';
var app = angular.module("app", []);

//Controller

app.controller('parentCtrl', function($scope) {

  $scope.obj = {message: ''};

});

//Directive - 1

app.directive( 'drctv1', function() {
  return {
    restrict: 'E',
    scope: false , //shared scope
    template: '<button ng-click="clicked()">drctv1</button><br>' +
    '<span>drctv1 knows that: {{obj.message}}</span>',
    controller: function($scope){
      $scope.clicked = function(){
        $scope.obj.message = 'user clicked drctv1!';
      }
    }
  };
});


//Directive - 2

app.directive( 'drctv2', function() {
  return {
    restrict: 'E',
    scope: true , //inherited scope
    template: '<button ng-click="clicked()">drctv2</button><br>' +
    '<span>drctv2 knows that: {{obj.message}}</span>',
    controller: function($scope){
      $scope.clicked = function(){
        $scope.obj.message = 'user clicked drctv2!';
      }
    }
  };
});

app.directive( 'drctv3', function() {
  return {
    restrict: 'E',
    scope: { myobj: '='} , //isolated scope, = sign creates two way binding
    template: '<button ng-click="clicked()">drctv3</button><br>' +
    '<span>drctv3 knows that: {{myobj.message}}</span>',
    controller: function($scope){
      $scope.clicked = function(){
        $scope.myobj.message = 'user clicked drctv3!';
      }
    }
  };
});
