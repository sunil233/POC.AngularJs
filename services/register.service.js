/* recommended */
(function () {
    angular
        .module('app')
        .factory('RegisterService', RegisterService);
    RegisterService.$inject = ['$http', '$q'];
    function RegisterService($http, $q) {
        return {
            SaveUser: SaveUser,
            login: login
        };
        function login(username, password) {
            return $http.get('/api/User/Login?username=' + username + '&password=' + password)
                .catch(error);
        }
        function SaveUser(userdata) {
            return $http.post('/api/User/SaveUser', userdata)
                .catch(error);
        }
        function error(error) {
            console.log('Error occured in RegisterService.' + error.data);
        }
    }
}());