// Extracting State Logic into State Pattern
'use strict';
var app = angular.module("app", ['ui.router']);
app.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider){
  $stateProvider
    .state('form',{
             url: "/form",
             abstract: true,
             templateUrl: "partials/form.html",
             controller: 'formCtrl'
           })
    .state('form.viewing',{
             url: "/viewing"
           })
    .state('form.editing',{
             url: "/editing"
           })
    .state('form.searching',{
             url: "/searching"
           });

  //Default route
  $urlRouterProvider.otherwise("/form/viewing");
}]);

app.controller('formCtrl', ['$scope', '$rootScope', '$state', '$window', 'FormStateSvc',
                            function ($scope, $rootScope, $state, $window, FormStateSvc) {

  var formStateSvc =  undefined;
  init();
  setPublicAPIs();
  registerEventHandlers();

  function init() {

    var srcdata = {
      fullname: "Yaser Marey",
      address: "2 Adel St., Quesna, Menufeya",
      phonenumber: "00201234567890"
    };

    $scope.srcdata = angular.copy(srcdata);
    $scope.data = angular.copy(srcdata);
    formStateSvc  = new FormStateSvc();     //Construct an instance of FormStateSvc
    $scope.ui = formStateSvc.state.ui;
  }

  function setPublicAPIs() {
    $scope.edit = function(){
      if (formStateSvc.state.edit())
          $state.go(formStateSvc.state.name);
    };

    $scope.save = function(){
      //This is to mimic saving data to data source
      $scope.srcdata = angular.copy($scope.data);
      if (formStateSvc.state.save())
          $state.go(formStateSvc.state.name);
    };

    $scope.search = function(){
      //In real application we would search data source here
      // and return the search result to the form
      if (formStateSvc.state.search())
          $state.go(formStateSvc.state.name);
    };

    $scope.ok = function(){
      if (formStateSvc.state.ok())
          $state.go(formStateSvc.state.name);
    };

    $scope.cancel = function(){
      $window.history.back();
    };
  }

  function registerEventHandlers() {

    $rootScope.$on( '$stateChangeSuccess', function( evt, toState, toParams, fromState, fromParams) {
      if (formStateSvc.state.name != toState.name){
                  formStateSvc.changeState(toState.name)
        }
      if(toState.name == formStateSvc.states.viewing.name){
                  $scope.data = angular.copy($scope.srcdata); // reset data to default, in real applications
                                                              // we would fetch current record from data source
      }
      else if(toState.name == formStateSvc.states.searching.name){
                  $scope.data = {};                           // Clear all form data to allow user to enter
      }
      $scope.ui = formStateSvc.state.ui;
    })
  }
}]);

app.factory('FormStateSvc', ['$log',function($log){
  return function()
  {
    this.state = undefined;
    this.states= {
      viewing: {
        initialize: function(target) {
          this.target = target;
        },
        save: function() {
          return false;
        },
        edit: function() {
          this.target.changeState(this.target.states.editing.name);
          return true;
        },
        search: function() {
          this.target.changeState(this.target.states.searching.name);
          return true;
        },
        cancel: function() {
          return false;
        },
        ok: function() {
          return false;
        },

        name: 'form.viewing',

        ui:{
          isReadOnly : true,
          canEdit : true,
          canCancel : false,
          canSave : false,
          canSearch : true,
          canOk : false
        }
      },
      editing: {
        initialize: function(target) {
          this.target = target;
        },
        save: function() {
          this.target.changeState(this.target.states.viewing.name);
          return true;
        },

        edit: function() {
          return false;
        },
        search: function() {
          return false;
        },
        cancel: function() {
          this.target.changeState(this.target.states.viewing.name);
          return true;
        },
        ok: function(){
          return false;
        },
        name: 'form.editing',
        ui: {
          isReadOnly : false,
          canEdit : false,
          canCancel : true,
          canSave : true,
          canSearch : false,
          canOk : false
        }
      },
      searching: {
        initialize: function(target) {
          this.target = target;
        },
        save: function() {
          return false;
        },
        edit: function() {
          return false;
        },
        search: function() {
          return false;
        },
        cancel: function() {
          return true;
        },
        ok: function(){
          this.target.changeState(this.target.states.viewing.name);
          return true;
        },
        name: 'form.searching',
        ui:{
          isReadOnly : false,
          canEdit : false,
          canCancel : true,
          canSave : false,
          canSearch : false,
          canOk : true
        }
      }
    };
    this.changeState = function(statename) {

      for (var i in this.states){
        if (this.states[i].name == statename){
          this.state = this.states[i];
        }
      }
      $log.info("I am in " + this.state.name + " state")
    };
      //Initialize state
      this.states.viewing.initialize(this);
      this.states.editing.initialize(this);
      this.states.searching.initialize(this);

      this.state = this.states.viewing;

      $log.info("Initially, I am in " + this.state.name + " state")
  }

}]);






