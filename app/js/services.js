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

 



  app.value('version', '0.1');



