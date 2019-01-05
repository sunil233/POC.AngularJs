
/*
*  Events Controller
*/

(function () {
    angular
        .module('app')
        .controller("EventsController", EventsController);

    EventsController.$inject = ['$scope', '$http', '$state'];
    function EventsController($scope, $http,$state) {
        var vm = this;
        vm.count = 0;
        vm.showMe = false;
        vm.ShowDiv = function () {
            vm.showMe = !vm.showMe;
        };
    }
}());