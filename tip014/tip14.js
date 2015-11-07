//Non-singleton Angular Services
'use strict';
var app = angular.module('app', []);
app.controller('tabctrl', function($scope){
  $scope.showtab = true;
  //switch tabs using showtab flag
  $scope.tabclicked = function(){
    $scope.showtab = !$scope.showtab;
  }
});

app.factory('formStateSvc', function()
 {
 //Instead of returning an object literal
 // return a constructor function
 return function(){

   var _data = {
     firstname: '',
     lastname: '',
     birtdate: ''
   };

   return {
     setData: function (data){
       _data = data;
     },
     getData: function (){
       return _data;
     }
   }
 };
 });

app.controller('ctrl', ['$scope','formStateSvc',function($scope, formStateSvc){

  var formSateSvcInstance = new formStateSvc();
  $scope.employee = formSateSvcInstance.getData();

}]);

