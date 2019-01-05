    (function () {
        angular
            .module('app')
            .factory('myDataService', ['$http', '$q', function ($http, $q) {
                return {
                    GetPromise: function (url) {
                        //  Deferred represents a task that will finish in the future. We can get a new deferred object by calling the defer() function on the $q service.
                        var defer = $q.defer();
                        $http.get(url).then(function (response) {
                            // The  method resolve is used to signal that the task has succeeded
                            // The method has one parameter. Whoever calls the method resolve can pass any type of information which shall be the result of the task.
                            // It can be a simple type like a string or a number or a complex object.
                            defer.resolve(response.data);
                        }, function (response) {
                            // The reject is used to signal that the task has failed. The reject method also takes one parameter, the reason of the failure.
                            // Again the parameter can be a simple type like a string or a complex type like an Error object.
                            defer.reject(response);
                        });
                        return defer.promise;
                    },
                    PostPromise: function (url, data) {
                        //  Deferred represents a task that will finish in the future. We can get a new deferred object by calling the defer() function on the $q service.
                        var defer = $q.defer();
                        $http.post(url, data).then(function (response) {
                            // The  method resolve is used to signal that the task has succeeded
                            // The method has one parameter. Whoever calls the method resolve can pass any type of information which shall be the result of the task.
                            // It can be a simple type like a string or a number or a complex object.
                            defer.resolve(response);
                        }, function (response) {
                            // The reject is used to signal that the task has failed. The reject method also takes one parameter, the reason of the failure.
                            // Again the parameter can be a simple type like a string or a complex type like an Error object.
                            defer.reject(response);
                        });
                        return defer.promise;
                    }
                };
            }]);
    }());
