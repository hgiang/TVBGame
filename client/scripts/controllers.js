'use strict';

var QUESTION_TIME = 30;
var BREAK_TIME = 2;

angular.module('tvbGame').controller('gameController', ['$scope', 'questionSet', '$timeout',
    function($scope, questionSet, $timeout) {
    var mytimeout;
    $scope.Math = window.Math;   
    $scope.current = -1;
    $scope.questions = questionSet;
    $scope.currentQ = $scope.questions[0];      
    $scope.answers = {};
    $scope.counter = QUESTION_TIME;
    $scope.started = true;
    $scope.state = '';
    $scope.total_points = 0;
    
    $scope.$on('$routeChangeSuccess', function () {
        $scope.begin();
    });

    $scope.onTimeout = function(){
      $scope.counter--;
      if ($scope.counter === 0) {
        $scope.stop();
        if ($scope.state == 'break') {
          $scope.loadNext();
        }
        else if ($scope.state = 'answering') {
          $scope.answer(-1);
        }
      } else {
        mytimeout = $timeout($scope.onTimeout, 1000);
      }
    };

    $scope.stop = function(){
      $timeout.cancel(mytimeout);
    };

    $scope.begin = function() {            
      $scope.state = 'started';     
      $scope.loadNext();
      window.onbeforeunload = function() {
        return "Are you sure you want to navigate away?";
      };      
    };

    $scope.start = function(){
      mytimeout = $timeout($scope.onTimeout, 1000);
    };

    $scope.finish = function(){                 
      $scope.state = 'summary';
      $scope.started = false;
      window.onbeforeunload = undefined;      
    };

    $scope.loadNext = function() {      
      $scope.current += 1;
      $scope.currentQ = $scope.questions[$scope.current]
      if ($scope.current >= $scope.questions.length) {
      //if ($scope.current >= 2) {
        $scope.finish();
      } else {
        aQ()['choices[]'] = _.shuffle(aQ()['choices[]']);
        $scope.counter = QUESTION_TIME;        
        $scope.state = 'answering';
        $scope.start();        
      }      
    };

    $scope.correctAnswers = function() {
      return _.filter($scope.answers, function(arg) { return arg.points > 0 }).length;
    };

    $scope.avgTime= function() {
      var sum = _.reduce($scope.answers, function(sum, val) {
        return sum + val.time;
      }, 0);
      if (_.size($scope.answers) === 0) return '';
      return (sum/_.size($scope.answers)).toFixed(2);
    };

    // Short name for active question
    function aQ() {
      return $scope.questions[$scope.current];
    }

    function changeAnswBtn(index, cls) {
      $('.question:not(.ng-hide) .answer-' + index)
        .removeClass('btn-info')
        .addClass(cls);
    }

    $scope.answer = function(choice) {
      if ($scope.state != 'answering') return;
      var points = 0;      
      $scope.stop();     
      $scope.correct = (choice == aQ().answer);

      if ($scope.correct) {
        points = Math.ceil($scope.counter/3);
        $scope.total_points += points;        
      } 

      $scope.answers[$scope.current] = {'choice': choice, 'time': $scope.counter, 'points': points};
      $scope.counter = BREAK_TIME;
      mytimeout = $timeout($scope.onTimeout, 1000);
      $scope.state = 'break';
    };
}]);

angular.module('tvbGame').controller('navbarController',function ($scope, $location) {    
    $scope.playGame=false;        
    $scope.$on('$routeChangeSuccess', function () {
        if($location.path() === '/play')
            $scope.playGame = true;
        else
            $scope.playGame = false;
    });
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
});
