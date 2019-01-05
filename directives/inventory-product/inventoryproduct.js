
//inventoryProducts directive
(function () {
    angular
        .module('app')
        .directive('inventoryProducts', function () {
            return {
                restrict: 'EA',                // directive is an Element (and Attribute)
                scope: {                      // set up directive's isolated scope
                    productscount: "@",      //  productscount var passed by value (string, one-way)
                    productsdata: '='       // productsdata var passed by reference (two-way)
                },
                controller: ['$scope', function ($scope) {
                    var p = $scope;
                }],
                templateUrl: 'directives/inventory-product/inventoryproduct.html',
                replace: true,          // replace original markup with template
                transclude: false,     // do not copy original HTML content
                link: function (scope, element) {

                }
            };
        });
}());