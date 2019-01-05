/*
*  Display Question  controller
*/
(function () {
    angular
        .module('app')
        .controller("QuestionCtrl", QuestionCtrl);

    QuestionCtrl.$inject = ['$scope', '$http', '$q', '$filter', '$location', 'myDataService', '$state'];
    function QuestionCtrl($scope, $http, $q, $filter, $location, myDataService, $state) {
        var vm = this;
        var url = "../../dataModels/questionsModel.json";
        vm.Questionspromise = myDataService.GetPromise(url);
        vm.Questionspromise.then(function (dataQuestions) {
            vm.QuestionsList = dataQuestions;
            vm.FormName = "APPLICATION FORM";
            vm.FormCode = "AL007"
            vm.form = $scope.myForm.$data;
        });
        vm.SubmitFormData = function () {
            if (vm.EditForm.$valid) {
                var FormData =
                {
                    "FormName": vm.FormName,
                    "FormCode": vm.FormCode,
                    "Description": "",
                    "JSONString": angular.toJson($scope.myForm.$data)
                };
                alert(angular.toJson($scope.myForm.$data));
                var url = '/api/FormBuilder/SaveFormData';
                vm.Formspromise = myDataService.PostPromise(url, FormData);
                vm.Formspromise.then(function (dataProducts) {
                });
            }
            else {
                angular.forEach(vm.EditForm.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$dirty = true;
                    });
                });
                //  alert("Please Enter all the mandatory fields")
            }
        };
    };
}());
