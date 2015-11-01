// value and constant methods
'use strict';
var app = angular.module("app", []);

app.controller('formCtrl', function($scope, modelSvc){

  setPublicAPIs();

  function setPublicAPIs()
  {
    $scope.new = function (){
      modelSvc.new();
    };
    $scope.save = function (){
      modelSvc.save();
    };
    $scope.delete = function (){
      modelSvc.delete();
    };
  }
});

//creating a service using value method
app.value('modelSvc', {
    new : function() {
      console.log('new record is initialized');
    },
    save : function() {
      console.log('record is saved');
    },
    delete : function() {
      console.log('record is deleted');
    }
});

