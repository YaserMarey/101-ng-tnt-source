// service method constructs a function that has prototypal inheritance
'use strict';
var app = angular.module("app", []);

app.controller('ctrl', function($scope, logSvc){

  logSvc.log();

});

//first we declare the base
function base(){
  this.log = function(){
    console.log('basic logging by base');
  }
};

//here we declare the derived
var derived = function (){
  this.log = function(){
    derived.prototype.log();
    console.log('additional logging by derived.');
  }
};

//set the prototypal inheritance relation
derived.prototype =  new base();

//now derived fucntion is ready to be used as a servcie
app.service('logSvc', derived);
