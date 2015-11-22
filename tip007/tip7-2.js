// using configuration to adjust service created using provider method
'use strict';
var app = angular.module('app', []);

app.constant('appconfig', {
                            isHijri : true
                          }
);

app.provider('employeeSvc', function(){
  var isHijri;
  this.isHijri = function(value){ //isHijri is defined on the provider
    isHijri = value;              //and its sole purpose is to adjust
                                  //the service behaviour
  }
  this.$get = function(){
    var firstname = 'Khaled';
    var lastname = 'El Banna';
    var birthdate = isHijri ? '01-07-1985 12-10-1405' : '01-07-1985';
    return {
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate //isHijri not part of the public service API

    }
  }
});

// passing in the configurable provider of the service along with the configuration object
app.config(function(employeeSvcProvider, appconfig){
  employeeSvcProvider.isHijri(appconfig.isHijri);
});


app.controller('ctrl', ['$scope','employeeSvc',function($scope, employeeSvc){
  $scope.employee = {};
  $scope.employee.firstname = employeeSvc.firstname;
  $scope.employee.lastname = employeeSvc.lastname;
  $scope.employee.birtdate = employeeSvc.birthdate;
}]);

