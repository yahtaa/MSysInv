'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'restangular']).
  config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
    
  	//HOME/LIST ROUTE
    $routeProvider.when('/', { controller: 'homeController', templateUrl: 'partials/home.html'});
    $routeProvider.when('/inventory', {templateUrl: 'partials/items.html', controller: 'InventoryListCtrl'});
  	$routeProvider.when('/scrap', { templateUrl: 'partials/scrapBuys.html', controller: 'ScrapPurchaseListCtrl'})
    //NEW ROUTES
    $routeProvider.when('/messageNew', { controller: 'messageCreateController', templateUrl: 'partials/messages.html'});
    $routeProvider.when('/newInventory', {templateUrl: 'partials/detail.html', controller: 'InventoryCreateCtrl'});
    $routeProvider.when('/purchase', {templateUrl: 'partials/purchase.html', controller: 'ScrapPurchaseNewCtrl'});

    //EDIT ROUTES
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
    $routeProvider.when('/scrap/:quoteId', {templateUrl: 'partials/printQuote.html', controller: 'ScrapPurchaseEditCtrl',
      resolve: { quote: function(Restangular, $route) {
          return Restangular.one('quote', $route.current.params.quoteId).get()
        }
      }
    });
    
    // REDIRECT IF NOT ROUTER  
    $routeProvider.otherwise({redirectTo: '/'});

  // RESTANGULAR SETTINGS
	RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/inventory/collections');
  RestangularProvider.setDefaultRequestParams({ apiKey: '2rkCE0w9ldCbPxXif0YDKgnL4c-u464W' })
	RestangularProvider.setRestangularFields({
	  id: '_id.$oid',	
  });	



	RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
  	if (operation === 'put') {
  	  elem._id = undefined;
  	  return elem;
  	}
  	return elem;
  	})
  }]);
