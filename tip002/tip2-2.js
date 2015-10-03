//Directive communication through Callback Function
'use strict';
var app = angular.module("app", []);

//Parent Controller

app.controller('parentCtrl', function($scope)
{
  $scope.data = {};
  $scope.notifyParent = function (msg){
    $scope.data.msg = msg;
  }
});

//Directive - 1

app.directive( 'drctv1', function() {
  return {
    restrict: 'E',
    scope: {
      notifyParent: '&' //function parameter
    } ,
    template: '<button ng-click="clicked()">drctv1</button><br>' +
    '<input type="text" ng-model="obj.msg"/>',
    controller: function($scope){
      $scope.obj = {};
      $scope.clicked = function(){
        $scope.notifyParent({msg: $scope.obj.msg});
      }
    }
  };
});

//Directive - 2

app.directive( 'drctv2', function() {
  return {
    restrict: 'E',
    template: '<span>{{data.msg}}</span>'
  }
});