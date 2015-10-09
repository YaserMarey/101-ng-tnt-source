//Directive communicating through sharing state using a service
'use strict';
var app = angular.module("app", []);

app.factory('stateService', function(){
  var _data = {};
  return {
    setData : function (data){
      _data = data;
    },
    getData : function (){
      return _data;
    }
  }
});

//Directive - 1

app.directive( 'drctv1', function(stateService) {
  return {
    restrict: 'E',
    scope:{}, //isolated Scope
    template: '<button ng-click="setState()">set State</button>',
    controller: function($scope){
      $scope.setState = function(){
        stateService.setData({greeting:"hello"});
      }
    }
  }
});

//Directive - 2

app.directive( 'drctv2', function(stateService) {
  return {
    restrict: 'E',
    scope: {}, //Isolated Scope
    template: '<button ng-click="checkState()">check State</button><br/><span>{{data.greeting}}</span> ',
    controller: function($scope){
        $scope.checkState = function(){
            $scope.data = stateService.getData();
      }
    }
  };
});



