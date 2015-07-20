'use strict';

/* Services */

angular.module('tvbGame').factory('Question', ['$resource',
  function($resource){  	  	
    return $resource('http://155.69.151.138:3000/questionlist/10', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);