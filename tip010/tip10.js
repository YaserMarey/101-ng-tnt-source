// Adding CRUD Toolbar Directive
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
                                    $scope.data = {};                           // clear all form data to allow user to enter
                                  }
                                  $scope.ui = formStateSvc.state.ui;
                                })
                              }
                            }]);

app.factory('FormStateSvc', ['$log',function($log){
  return function() //returning function instead of object literal
  {
    this.state = undefined;
    var statebase = function (){
      this.initialize = function(target) {
        this.target = target;
      };
      this.save = function() {
        return false;
      };
      this.edit = function() {
        return false;
      };
      this.search = function() {
        return false;
      };
      this.cancel = function() {
        return false;
      }
      this.ok = function() {
        return false;
      }
    }

    var viewing = function(){
      this.edit = function() {
        this.target.changeState(this.target.states.editing.name);
        return true;
      };
      this.search = function() {
        this.target.changeState(this.target.states.searching.name);
        return true;
      };
      this.name = 'form.viewing';
      this.ui = {
        isReadOnly : true,
        canEdit : true,
        canCancel : false,
        canSave : false,
        canSearch : true,
        canOk : false
      };
    };
    viewing.prototype = new statebase();

    var editing = function(){
      this.save = function() {
        this.target.changeState(this.target.states.viewing.name);
        return true;
      };
      this.cancel = function() {
        this.target.changeState(this.target.states.viewing.name);
        return true;
      };
      this.name ='form.editing';
      this.ui = {
        isReadOnly : false,
        canEdit : false,
        canCancel : true,
        canSave : true,
        canSearch : false,
        canOk : false
      }
    };
    editing.prototype = new statebase();

    var searching = function(){
      this.ok = function() {
        this.target.changeState(this.target.states.viewing.name);
        return true;
      };
      this.name = 'form.searching';
      this.ui = {
        isReadOnly : false,
        canEdit : false,
        canCancel : true,
        canSave : false,
        canSearch : false,
        canOk : true
      }
    };
    searching.prototype = new statebase();

    this.states= {
      viewing: new viewing(),
      editing: new editing(),
      searching: new searching()
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

app.directive('formToolbar', function () {

               return {
                 restrict: 'E',
                 replace: true,
                 templateUrl: 'partials/toolbarawesome.html', //'toolbarglyphicon.html'
                 scope: false , /*decided to share its scope with the parent since it will be tightly
                                working as part of the page and needs to access the parent scope a lot*/
                 link: function ($scope, $element, $attrs) {
                 }
               }
             });
