/*
*  Register Controller
*/

(function () {
    angular
        .module('app')
        .controller("RegisterController", RegisterController);

    RegisterController.$inject = ['$state', 'RegisterService'];
    function RegisterController($state, RegisterService) {
        var vm = this;
        vm.register = register;
        vm.login = login;
        function register() {
            //if form is valid
            if (vm.RegistrationForm.$valid) {
                var userdata = {
                    "FirstName": vm.FirstName,
                    "LastName": vm.LastName,
                    "Username": vm.Username,
                    "Password": vm.Password,
                    "DOB": vm.DOB
                };
                //save user data 
                vm.Registerpromise=  RegisterService.SaveUser(userdata).then(function (result) {
                    if (result) {
                        $state.go('app.topics');
                    }
                });
            }
            else {
                vm.RegistrationForm.FirstName.$dirty = true;
                vm.RegistrationForm.LastName.$dirty = true;
                vm.RegistrationForm.Username.$dirty = true;
                vm.RegistrationForm.Password.$dirty = true;
                vm.RegistrationForm.account_DOB.$dirty = true;
            }
        }
        function login() {
            vm.loginpromise = RegisterService.login(vm.username, vm.password).then(function (result) {
                if (result) {
                    $state.go('app.topics');
                }
            });
        }
    }
}());