/*
*  Display Store controller
*/

(function () {
    'use strict';
    angular
        .module('app')
        .controller('StoreCtrl', StoreCtrl);
    StoreCtrl.$inject = ['$state', 'myDataService'];
    function StoreCtrl($state,  myDataService) {
        var vm = this;
        vm.products = [];
        vm.currentPage = 1;
        vm.pageSize = 5;
        //get the products from Data Model
        var url = "../../dataModels/products.json";
        vm.storepromise = myDataService.GetPromise(url);
        vm.storepromise.then(function (dataProducts) {
            vm.products = dataProducts;
            vm.totalItems = vm.products.length;
        });
        vm.AddedProducts = [];
        if (sessionStorage["Cart_items"] != null) {
            vm.AddedProducts = angular.fromJson(sessionStorage["Cart_items"]);
        }
        // adds an item to the cart
        vm.addItem = function (product, quantity) {
            vm.product = $filter('filter')(vm.AddedProducts, { ProductCode: product.ProductCode });
            if (vm.product.length > 0) {
                product.Quantity = product.Quantity + quantity;
            }
            else {
                vm.product = $filter('filter')(vm.products, { ProductCode: product.ProductCode });
                vm.AddedProducts.push(product);
            }
            if (vm.AddedProducts.length > 0) {
                sessionStorage["Cart_items"] = angular.toJson(vm.AddedProducts);
            }
        };
        //Method to calculate total price
        vm.getTotalPrice = function () {
            var total = 0;
            if (vm.AddedProducts.length > 0) {
                angular.forEach(vm.AddedProducts, function (item, key) {
                    total += 1 * item.Price;
                });
            }
            return total;
        };
        vm.getTotalCount = function () {
            var TotalCount = 0;
            if (vm.AddedProducts.length > 0) {
                TotalCount = vm.AddedProducts.length;
            }
            return TotalCount;
        };
        vm.checkout = function () {
            //You can place data onto the sessionStorage object and that data persists for as long as that window (or tab) is open.
            //Even if you navigate away from the page that stored the data and then navigate back, the data saved to sessionStorage is still available.
            //Making things more interesting, sessionStorage is unique to a particular window or tab
            sessionStorage["Cart_items"] = angular.toJson(vm.AddedProducts);
            $state.go('app.shoppingCart');
        };
        vm.Proceed = function () {
            sessionStorage["Cart_items"] = angular.toJson(vm.AddedProducts);
            $location.path("/store");
        };
    }
})();

