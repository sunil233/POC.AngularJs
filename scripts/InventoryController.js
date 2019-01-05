/*
*  Inventory controller
*/

(function () {
    angular
        .module('app')
        .controller("InventoryCtrl", InventoryCtrl);

    InventoryCtrl.$inject = ['$scope', 'myDataService', '$state'];
    function InventoryCtrl($scope, myDataService, $state) {
        var vm = this;
        var url = "/api/Products/GetProducts";
        vm.Productspromise = myDataService.GetPromise(url)
            .then(successCallback, errorCallback);
        function successCallback(dataProducts) {
            vm.products = dataProducts;
            vm.productscount = vm.products.length;
        }
        function errorCallback(error) {
            console.log(error, 'can not get data.');
        }
    }
}());