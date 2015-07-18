'use strict';

/* Services */

angular.module('tvbGame').factory('Question', ['$resource',
  function($resource){  	  	
    return $resource('http://155.69.151.138:3000/questionlist', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);