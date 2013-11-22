'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'restangular']).
  config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
    // $routeProvider.when('/', {templateUrl: 'partials/login.html', controller: 'LoginController'});
  	$routeProvider.when('/', { controller: 'homeController', templateUrl: 'partials/home.html'});
  	$routeProvider.when('/messageNew', { controller: 'messageCreateController', templateUrl: 'partials/messages.html'});
  	$routeProvider.when('/message/edit/:messageId', { controller: 'messageEditController', templateUrl: 'partials/messages.html',
  		resolve: { messages: function(Restangular, $route){
  				return Restangular.one('messages', $route.current.params.messageId).get();
  			}
  		}
 	});
  	$routeProvider.when('/inventory/edit/:itemId', { controller: 'InventoryEditCtrl', templateUrl:'partials/detail.html',
        resolve: { inventory: function(Restangular, $route){
            return Restangular.one('inventory' ,$route.current.params.itemId).get();
          }
        }
      });
    $routeProvider.when('/inventory', {templateUrl: 'partials/items.html', controller: 'InventoryListCtrl'});
    $routeProvider.when('/newInventory', {templateUrl: 'partials/detail.html', controller: 'InventoryCreateCtrl'});
    $routeProvider.when('/purchase', {templateUrl: 'partials/purchase.html', controller: 'InventoryPurchaseCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});

	RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/sbcj_inventory/collections');
	RestangularProvider.setDefaultRequestParams({ apiKey: 'DWtgIWdHqDtb-QZoKrcpQON63w4vb0Xh' })
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
