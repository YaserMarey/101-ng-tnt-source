//Directive requiring controller of parent directive
'use strict';
var app = angular.module("app", []);


//parent

app.directive( 'parent', function() {
  return {
    restrict: 'E',
    controller: function($scope){
      this.calculate = function(){
        console.log(5+5);
      }
    }
  }
});

//child

app.directive( 'child', function() {
  return {
    restrict: 'E',
    scope: {},
    require: '^parent', //Look on parent or the same node for controller
    template: '<button ng-click="clicked()">click me</button>',
    link: function(scope, elm, attrs, parentCtrl){ //Then inject it as parentCtrl
      scope.clicked = function(){
        parentCtrl.calculate();
      }
    }
  };
});
