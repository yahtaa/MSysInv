'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'restangular']).
  config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
  	$routeProvider.when('/inventory', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/inventory/:categoryId', {templateUrl: 'partials/items.html', controller: 'InventoryListCtrl'});
    $routeProvider.when('/inventory/edit/:itemId', {templateUrl: 'partials/detail.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/inventory'});

	RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/sbcj_inventory/collections');
	RestangularProvider.setDefaultRequestParams({ apiKey: ENV_VAR })
	RestangularProvider.setRestangularFields({
	id: '_id.$oid'
	});

	RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

	if (operation === 'put') {
	  elem._id = undefined;
	  return elem;
	}
	return elem;
	})
  }]);
