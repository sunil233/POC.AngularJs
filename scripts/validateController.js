/*
*  validations controller
*/

(function () {
    angular
        .module('app')
        .controller("validateCtrl", validateCtrl);

    validateCtrl.$inject = ['$scope', '$http', '$state'];
    function validateCtrl($scope, $http, $state) {
        var vm = this;

        vm.addProduct = function () {
            if (vm.ProductsForm.$valid) {
                //do something
            }
            else {
                vm.ProductsForm.ProductName.$dirty = true;
                vm.ProductsForm.ProductCode.$dirty = true;
                vm.ProductsForm.txtPrice.$dirty = true;
                vm.ProductsForm.txtQuantity.$dirty = true;
            }
        };
    }
}());