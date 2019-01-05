
/*
*  Data binding controller
*/

(function () {
    angular
        .module('app')
        .controller("DataBindingController", DataBindingController);

    DataBindingController.$inject = ['$scope', '$http', '$state'];
    function DataBindingController($scope, $http, $state) {
        var vm = this;
        vm.firstName = 'Sunil';
        vm.lastName = 'john';
    }
}());
