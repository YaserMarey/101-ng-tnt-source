// factory and service methods
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

//creating a service using factory method
app.factory('modelSvc', function() {
  return {
    new : function() {
      console.log('new record is initialized');
    },
    save : function() {
      console.log('record is saved');
    },
    delete : function() {
      console.log('record is deleted');
    }
  }
});

//creating a service using service method
/*
app.service('modelSvc', function() {
    this.new = function() {
      console.log('new record is initialized');
    };
    this.save = function() {
      console.log('record is saved');
    };
    this.delete = function() {
      console.log('record is deleted');
    }
 });
*/
