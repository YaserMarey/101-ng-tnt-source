//Anchor URI Pattern
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

app.controller('formCtrl', ['$scope', '$rootScope', '$state', '$window',
                            function ($scope, $rootScope, $state, $window) {

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

    $scope.isReadOnly = true;
    $scope.canEdit = true;
    $scope.canCancel = false;
    $scope.canSave = false;
    $scope.canSearch = true;
    $scope.canOk = false;
  }

  function setPublicAPIs() {
  $scope.edit = function(){
    if ($state.is("form.viewing"))
            $state.go("form.editing");
  };

  $scope.save = function(){
    //This is to mimic saving data to data source
    $scope.srcdata = angular.copy($scope.data);

    if ($state.is("form.editing"))
            $state.go("form.viewing");
    };

  $scope.search = function(){
    //In real application we would search data source here
    // and return the search result to the form
    if ($state.is("form.viewing"))
            $state.go("form.searching");
  };

  $scope.ok = function(){
      if ($state.is("form.searching"))
           $state.go("form.viewing");
    };

  $scope.cancel = function(){
    $window.history.back();
  };
}

  function registerEventHandlers() {

    $rootScope.$on( '$stateChangeSuccess', function( evt, toState, toParams, fromState, fromParams) {
      if(toState.name == 'form.viewing'){
            $scope.data = angular.copy($scope.srcdata); // reset data to default, in real applications
                                                        // we would fetch current record from data source
            $scope.isReadOnly = true;
            $scope.canEdit = true;
            $scope.canCancel = false;
            $scope.canSave = false;
            $scope.canSearch = true;
            $scope.canOk = false;
      }
      else if(toState.name == 'form.editing'){
            $scope.isReadOnly = false;
            $scope.canEdit = false;
            $scope.canCancel = true;
            $scope.canSave = true;
            $scope.canSearch = false;
            $scope.canOk = false;
      }
      else if(toState.name == 'form.searching'){
            $scope.data = {};                         // Clear all form data to allow user to enter
                                                      // data to search with.
            $scope.isReadOnly = false;
            $scope.canEdit = false;
            $scope.canCancel = true;
            $scope.canSave = false;
            $scope.canSearch = false;
            $scope.canOk = true;
      }
    })
  }
}]);




