// value and constant methods
'use strict';
var app = angular.module("app", []);

app.controller('formCtrl', function($scope, modelSvc, appConfigSvc){
  init();
  setPublicAPIs();
  function init(){

   //appConfigSvc makes configuration settings available system wide.
   console.log(appConfigSvc.backendAPIUrlDev);
   console.log(appConfigSvc.backendAPIUrlStg);
   console.log(appConfigSvc.backendAPIUrlPrd);
   console.log(appConfigSvc.loggingLever);
   console.log(appConfigSvc.isHejra);

  }

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

//creating a service using constant method
app.value('appConfigSvc', {
  backendAPIUrlDev: 'http://developmentserver/rest',
  backendAPIUrlStg: 'http://stagingserver/rest',
  backendAPIUrlPrd: 'http://productserver/rest',
  loggingLever: 'Verbose',
  isHejra: true //to use Islamic calendar in addition to Gregorian
});
