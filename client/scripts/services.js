'use strict';

/* Services */

angular.module('tvbGame').factory('Question', ['$resource',
  function($resource){  	  	
    return $resource('http://155.69.149.24:3000/songlist', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);