'use strict';

/* Controllers */

var app = angular.module('myApp.controllers',[]);
  

  // app.controller('InventoryListCtrl',
  // function InventoryListCtrl($scope, $routeParams, Inventory, Restangular) {
  // // $scope.inventory = Inventory.query({inventoryId: $routeParams.inventoryId});
 

  // // $scope.orderProp = 'trackingid'
  // //  $scope.inventory = Inventory.get({inventoryId: $routeParams.inventoryId});
  // });

  // USER AUTHENTICATION
  // app.controller('LoginController', 
  // function LoginController($scope, Authentication) {
  //    $scope.credentials = { email: "", password: "" };
  //    $scope.login = function() {
  //       Authentication.login($scope.credentials);
  //     }
  //   });
  
  app.controller('homeController',
    function homeController($scope, $routeParams, Restangular) {
      $scope.messages = Restangular.all('messages').getList($routeParams.categoryId);
      $scope.logout = function() {
        Authentication.logout();
      }; 
    });

  app.controller('messageCreateController', 
    function messageCreateController($scope, $location, Restangular){
      $scope.save = function() {
        Restangular.all('messages').post($scope.messages).then(function(messages){
          $location.path('#/')
        }); 
      };
    });

  app.controller('messageEditController',
    function messageEditController($scope, Restangular, $location, $route, messages) {
      var original = messages;
      $scope.messages = Restangular.copy(original);

      $scope.isClean = function() {
        return angular.equals(original, $scope.messages);
      }
      $scope.destroy = function() {
        original.remove().then(function(){
          $location.path('#/');
        });
      };
      $scope.save = function() {
        $scope.messages.put().then(function() {
          alert("Message Updated");
          $location.path('#/')
        });
      };
    });

  app.controller('InventoryListCtrl', 
    function InventoryCategoryControl($scope, $routeParams, Restangular) {
             
      $scope.inventory = Restangular.all('inventory').getList($routeParams.categoryId);
      $scope.orderProp = 'trackingid';
      $scope.binClick = function() {
        return this;
      }      
  });

  app.controller('InventoryCreateCtrl', 
    function InventoryCreatCtrl($scope, $location, Restangular){
      $scope.save = function() {
        Restangular.all('inventory').post($scope.inventory).then(function(inventory){
          $location.path('#/inventory')
        });
      };
    });

  app.controller('InventoryEditCtrl',
    function InventoryEditCtrl($scope, Restangular, $location, $route, inventory) {
      var original = inventory;
      $scope.inventory = Restangular.copy(original);

       $scope.isClean = function() {
        return angular.equals(original, $scope.inventory);
       }
       $scope.destroy = function() {
        original.remove().then(function(){
          $location.path('#/inventory');
        });
       };
       $scope.save = function() {
        $scope.inventory.put().then(function() {
          alert("Item Updated");
          $route.reload();
        });
       };
  });
  
  app.controller("InventoryPurchaseCtrl",
    function InventoryPurchaseCtrl($scope, quoteFactory){
      $scope.purity = [
      {name: "10k", value: 0.395},
      {name: "14k", value: 0.568},
      {name: "18k", value: 0.740},
      {name: "22k", value: 0.916},
      {name: "sterling", value: 0.925},
      {name: "pure", value: 0.999},
      {name: "90%", value: 0.900},
      {name: "95%", value: 0.950}
        ];
      $scope.percentpay = [
      {name: "50%", value: 0.500},
      {name: "55%", value: 0.550},
      {name: "60%", value: 0.600},
      {name: "65%", value: 0.650},
      {name: "70%", value: 0.700},
      {name: "75%", value: 0.750},
      {name: "80%", value: 0.800},
      {name: "85%", value: 0.850},
      {name: "90%", value: 0.900}
      ];
      
      

      $scope.getTotal = function() {
        var total = ((($scope.karat * $scope.spot) * $scope.percentage) / 20) * $scope.estimatedWeight;
        return total
      }

      $scope.quote = [];

      init();

      function init() {
        $scope.quote = quoteFactory.getQuote();
      }

      $scope.addQuote = function() {

        if ($scope.estimatedWeight > $scope.actualWeight) {
          toastr.error("Estimated weight cannot be greater than actual weight.");
          exit;
        } else {
          $scope.quote.push({ 
            total: ((($scope.karat * $scope.spot) * $scope.percentage) / 20) * $scope.estimatedWeight,
            karat: $scope.karat,
            description: $scope.description,
            actualWeight: $scope.actualWeight + 'dwt',
            estimatedWeight: $scope.estimatedWeight + 'dwt',
            percent: $scope.percentage * 100 + '%'
        
         })
        }
        $scope.karat = "";
        $scope.spot = "";
        $scope.percentage = "";
        $scope.weight = "";
        $scope.actualWeight = "",
        $scope.estimatedWeight = ""
        $scope.description = ""
      }
      
   
      $scope.offerTotal = function() {
        var offer = 0;
        for (var i=0; i < $scope.quote.length; i++){
          offer += $scope.quote[i].total;
          
        }
        return offer;
      }

    });