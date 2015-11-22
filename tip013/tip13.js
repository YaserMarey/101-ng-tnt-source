//Building Controllers using Template Method Pattern
'use strict';
var app = angular.module("app", []);
app.controller('ctrl1', function($scope, templateCtrlSvc, $log) {

  var tmpMthd = new templateCtrlSvc();
  tmpMthd.init = init;
  tmpMthd.step_two = step_two;
  tmpMthd.step_four = step_four;
  tmpMthd.run($scope);

  function init($scope){
    $log.warn('ctrl1-init');
    $scope.buttonname = 'button one';
    $scope.clicked = function(){ alert('Hello from ' + $scope.buttonname + ' !');}
  }
  function step_two() {$log.warn("ctrl1-custom step two");}
  function step_four(){
    $log.warn('ctrl1-custom step four');
  }
});

app.controller('ctrl2', function($scope, templateCtrlSvc, $log) {
  //var that = this;
  var tmpMthd = new templateCtrlSvc();
  tmpMthd.init = init;
  tmpMthd.step_four = step_four;
  tmpMthd.run($scope);

  function init($scope) {
    $log.warn('ctrl2-init');
    $scope.buttonname = 'button two';
    $scope.clicked = function(){ alert('Hi from ' + $scope.buttonname + '!');}
  }
  function step_four() {
    $log.warn('ctrl2-custom step four');
  }
});

app.service('templateCtrlSvc', function($log) {
  var instance = function() {
    this.init = function ($scope, $log) {
      throw ("you must implement init function");
    };
    this.step_one =  function ($log) {
      $log.info("default step one");
    }
    this.step_two = function($log) {$log.info('default step two ');}
    this.step_three = function($log) {
      $log.info("default step three");
    }
    this.step_four = function ($log) {
      $log.info("default step four");
    }
    this.close = function($log) {
      $log.info("default close \n");
    }
    this.run = function ($scope) {
      this.init($scope,$log);
      this.step_one($log);
      this.step_two($log);
      this.step_three($log);
      this.step_four($log);
      this.close($log);
    }
  }
  return instance;
});

app.directive( 'welcomeButton', function($log) {
  return {
    restrict: 'E',
    scope: {} ,
    template: '<button ng-click="clicked()">click me</button>',
    controller: '@',
    name: 'controllerName',
    link: function ($scope, $element, $attrs) {
      $log.debug('Inside ' + $scope.buttonname +' link function' );
    }
  };
});