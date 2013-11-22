'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('myApp.services', ['ngResource']);
  app.factory('Inventory', ['$resource',
  function($resource){
    return $resource('inventory/:inventoryId.json', {}, {
      get: {method:'JSONP', params:{inventoryId:'inventories'}, isArray:true}
    });
  }]);

  app.factory('Scrap', ['$resource', 
  	function($resource){
  		return $resource('scrap/:scrapId.json', {}, {
  			get: {method: 'JSONP', params:{scrapId:'scrap'}, isArray:true}
  		});
  	}]);

  app.factory('Messages', ['$resource',
  function($resource){
    return $resource('messages/:messageId.json', {}, {
      get: {method:'JSONP', params:{messageId:'messages'}, isArray:true}
    });
  }]);

  // USER AUTHENTICATION //
  app.factory('Authentication', function($location) {
  return {
    login: function(credentials) {
      if (credentials.email !== "admin@admin.com" || credentials.password !== "admin") {
        toastr.error("Email must be 'admin@admin.com', and password must be 'admin'!");
      } else {
        $location.path('/main');
        toastr.success("Hello " + credentials.email)
      }
    },
    logout: function() {
      $location.path('/');
    }
  };
});


// FACTORY FOR SCRAP QUOTE //

  app.factory('quoteFactory', function() {
  	var quote = [];
  	var factory = {};
  	factory.getQuote = function () {
  		return quote;
  	};
  	return factory;
  })



