// provider methods
'use strict';
var app = angular.module('app', []);

app.provider('employeeSvc', function(){ //Create a service using provide method called on module, the same method is also exposed through $provide service.

  this.$get = function(){

    var firstname = 'Khaled';
    var lastname = 'El Banna';
    var birtdate = '01-07-1985';

    return {
      firstname: firstname,
      lastname: lastname,
      birthdate: birtdate
    }
  }

});


app.controller('ctrl', ['$scope','employeeSvc',function($scope, employeeSvc){

  $scope.employee = {};
  $scope.employee.firstname = employeeSvc.firstname;
  $scope.employee.lastname = employeeSvc.lastname;
  $scope.employee.birtdate = employeeSvc.birthdate;

}]);

