'use strict';

// Declare app level module which depends on filters, and services
angular.module('tvbGame', ['ngRoute','ngResource'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/intro.html', controller: ''});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: ''});
  $routeProvider.when('/help', {templateUrl: 'partials/help.html', controller: ''});
  $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: ''});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'});
  $routeProvider.when('/play', {
  								templateUrl: 'partials/play.html', 
  								controller: 'gameController',
  								resolve: {
    								questionSet: function (Question) {
      									return Question.query().$promise;	
		    						}
  								}
  					});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);

