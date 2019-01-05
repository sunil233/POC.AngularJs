/*
*  Products controller
*  In Angular we have the $q service that provide deferred and promise implementations. This $q service is heavily inspired by the Q library of Kris Kowal.
*  vm is used to represent the binding scope. This gets rid of the $scope variable from most of my controllers.
*/

(function () {
    angular
        .module('app')
        .controller("ProductsController", ProductsController);

    // We are injecting the $http,$q to the ProductsController
    ProductsController.$inject = ['$scope', '$http', '$q', 'myDataService', '$state'];
    function ProductsController($scope, $http, $q, myDataService, $state) {
        var vm = this;
        var url = "/api/Products/GetProducts";
        vm.Productspromise = myDataService.GetPromise(url);
        vm.Productspromise.then(function (dataProducts) {
            vm.products = dataProducts;
        });
        vm.editing = false;
        //method to Add Product;
        vm.addProduct = function (item) {
            if (vm.ProductsForm.$valid) {
                //creating product object
                var product =
                {
                    ProductId: vm.products.count + 1,
                    ProductName: vm.ProductName,
                    ProductCode: vm.ProductCode,
                    Price: vm.Price,
                    Quantity: vm.Quantity
                };
                //inserting the product object into products array
                vm.products.push(product);
                var url = '/api/Products/SaveProducts';
                vm.Productspromise = myDataService.PostPromise(url, vm.products);
                vm.Productspromise.then(function (dataProducts) {
                    vm.product = {};
                });
            }
            else {
                vm.ProductsForm.ProductName.$dirty = true;
                vm.ProductsForm.ProductCode.$dirty = true;
                vm.ProductsForm.txtPrice.$dirty = true;
                vm.ProductsForm.txtQuantity.$dirty = true;
            }
        };
        //method to Remove Product;
        vm.removeProduct = function (index) {
            vm.products.splice(index, 1);
        };
        //Method to Edit Product
        vm.editProduct = function (index) {
            vm.editing = vm.products.indexOf(index);
        };
        vm.totalPrice = function () {
            var total = 0;
            if (vm.products != undefined) {
                for (count = 0; count < vm.products.length; count++) {
                    total += vm.products[count].Price * vm.products[count].Quantity;
                }
            }

            return total;
        };
        vm.saveField = function (index) {
            if (vm.editing !== false) {
                vm.editing = false;
            }
        };
        vm.cancel = function (index) {
            if (vm.editing !== false) {
                vm.editing = false;
            }
        };
    }
}());
