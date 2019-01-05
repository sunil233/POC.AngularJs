/*
*  Display Cart Summary controller
*/

(function () {
    angular
        .module('app')
        .controller("CartSummaryCtrl", CartSummaryCtrl);

    CartSummaryCtrl.$inject = ['$scope', '$http', '$filter', '$state'];
    function CartSummaryCtrl($scope, $http, $filter, $state) {
        var vm = this;
        if (sessionStorage["Cart_items"] != undefined) {
            vm.items = angular.fromJson(sessionStorage["Cart_items"]);
        }
        vm.addItem = function (item, quantity, action) {
            vm.product = $filter('filter')(vm.items, { ProductCode: item.ProductCode });
            var updatedQty = 0;
            if (action == "add") {
                updatedQty = vm.product[0].Quantity + quantity;
            }
            else if (action == "remove") {
                updatedQty = vm.product[0].Quantity - quantity;
            }

            vm.product[0].Quantity = updatedQty;
        };

        vm.remove = function (item, index) {
            vm.items.splice(index, 1);
        };
        vm.backtostore = function () {
            sessionStorage["Cart_items"] = angular.toJson(vm.items);
            $state.go('app.store');
        };
        vm.getTotalPrice = function () {
            var total = 0;
            angular.forEach(vm.items, function (item, key) {
                total += item.Quantity * item.Price;
            });
            return total;
        };
    }
}());
