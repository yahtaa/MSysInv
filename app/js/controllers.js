'use strict';

/* Controllers */

var app = angular.module('myApp.controllers',[]);
  

  // app.controller('InventoryListCtrl',
  // function InventoryListCtrl($scope, $routeParams, Inventory, Restangular) {
  // // $scope.inventory = Inventory.query({inventoryId: $routeParams.inventoryId});
 

  // // $scope.orderProp = 'trackingid'
  // //  $scope.inventory = Inventory.get({inventoryId: $routeParams.inventoryId});
  // });

  app.controller('InventoryListCtrl', 
    function InventoryCategoryControl($scope, $routeParams, Inventory, Restangular) {
      // $scope.inventory = Inventory.get();
       
       $scope.bullion = Restangular.all($routeParams.categoryId).getList();
       $scope.name = '';
  });

  app.controller('InventoryEditCtrl',
    function InventoryEditCtrl($scope, Restangular, inventory) {
      var original = bullion;
      $scope.project = Restangular.copy(original);
  });
  app.controller('MyCtrl2', [function() {

  }]);