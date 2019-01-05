//Reference [Style Y165]: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#manual-annotating-for-dependency-injection
// https://raw.githubusercontent.com/johnpapa/angular-styleguide/master/a1/assets/modularity-1.png
//The application root module depends on the app specific feature modules and any shared or reusable modules.


/*  This POC is implemented based on John Papa Style guide recomendations
 *  
Features Implemented

1) Lazy Loading
i) Dependencies are automatically loaded
ii) The ability to mix normal boot and load on demand
iii) Load via the service or the directive
iv) Use the embedded async loader or use your own(requireJS, ...)
v) Load js(angular or not) / css / templates files
vi) Compatible with AngularJS 1.2.x / 1.3.x / 1.4.x / 1.5.x / 1.6.x
2) Routing
Angular UI - Router is a client - side Single Page Application routing framework for AngularJS.
   Routing frameworks for SPAs update the browser's URL as the user navigates through the app.
Conversely, this allows changes to the browser's URL to drive navigation through the app,
thus allowing the user to create a bookmark to a location deep within the SPA.

3) Interceptors
An interceptor is simply a factory() service that returns an object with 4 properties that map to functions:
a) request: called before a request is sent, capable of mutating the request object
b) requestError:
c) response: called with an $http request succeeds, is passed the results object,
    d) responseError: called if an $http method fails
We should pass the  token to every API call.
Sample call using the Authorization header using AngularJS:
Refer: https://thinkster.io/interceptors
https://github.com/Tmeister/wp-api-jwt-auth
The wp - api - jwt - auth will intercept every call to the server and will look for the authorization header,
if the authorization header is present, it will try to decode the token and will set the user according with the data stored in it.
If the token is valid, the API call flow will continue as always.

// Sample dependency injection :
// angular.module('app', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cgBusy']);
// The above code can be organized as follows

*************************************************************************************************************************************************************
*/
// Main App Module
(function () {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'app.routes',
            'app.bootstrapui',
            'app.authroute'
        ]);
})();

//01  app.core
(function () {
    'use strict';
    angular
        .module('app.core', [
            /* Angular modules */
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'ngSanitize',
            'ngResource',
            /* 3rd-Party modules */
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad'
        ]);
})();

//02  app.routes
(function () {
    'use strict';
    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();

//02.1  app.lazyload
(function () {
    'use strict';

    angular
        .module('app.lazyload', []);
})();

//02.2 app.lazyload
//https://ciphertrick.com/2016/07/06/lazy-load-modules-and-controllers-in-angularjs/
(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'jsRequires'];
    function lazyloadConfig($ocLazyLoadProvider, jsRequires) {
        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules,
            version: jsfileVersion
        });
    }
})();

//02.3 app.lazyload
(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('jsRequires', {
            // jQuery based and standalone scripts
            scripts: {
                'ApplicationScriptFiles': [
                    'services/myDataService.js',
                    'services/register.service.js',
                    'scripts/core.bootstrapui.js',
                    'directives/inventory-product/inventoryproduct.js',
                    'scripts/CartSummaryController.js',
                    'scripts/DataBindingController.js',
                    'scripts/EventsController.js',
                    'scripts/InventoryController.js',
                    'scripts/ProductsController.js',
                    'scripts/QuestionController.js',
                    'scripts/RegisterController.js',
                    'scripts/StoreController.js',
                    'scripts/validateController.js'                               
                ]
            },
            // Angular based script (use the right module name)
            modules: [
                {
                    name: 'angularFileUpload', files: ['vendor/angular-file-upload/angular-file-upload.js']
                },
                {
                    name: 'cgBusy', files: ['vendor/angular-busy/angular-busy.min.css', 'vendor/angular-busy/angular-busy.min.js']
                }
            ]
        })
        ;
})();

//02.4 RouteHelpers
//Reference: https://stackoverflow.com/questions/33431797/angularjs-multiple-resolve
(function () {
    'use strict';
    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider);

    RouteHelpersProvider.$inject = ['jsRequires'];
    function RouteHelpersProvider(jsRequires) {
        return {
            basepath: basepath,
            loadSequence: loadSequence,
            $get: function () {
                return {
                    basepath: basepath,
                    loadSequence: loadSequence
                };
            }
        };
        function basepath(uri) {
            return 'views/' + uri;
        }
        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    var promise = $q.when(1);
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = promiseThen(_args[i]);
                    }
                    return promise;
                    function promiseThen(_arg) {

                        if (typeof _arg == 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function () {
                                var nowLoad = requiredData(_arg);
                                //console.log(nowLoad)
                                if (!nowLoad)
                                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                return $ocLL.load(nowLoad);
                            });
                    }
                    function requiredData(name) {
                        if (jsRequires.modules)
                            for (var m in jsRequires.modules)
                                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                    return jsRequires.modules[m];
                        return jsRequires.scripts && jsRequires.scripts[name];
                    }
                }]
            };
        }
    }
})();

//02.5 route providers
(function () {
    'use strict';
    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag (  <base href="/" />)in index and a routing configuration in your server
        $('a').each(function () {
            $a = $(this);
            if ($a.is('[target]') || $a.is('[ng-href]')) {
                console.log("clicked anchor");
            } else {
                $a.attr('target', '_self');
            }
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
        // defaults to default page
        $urlRouterProvider.otherwise('/default');
        // Application Routes
        // -----------------------------------

        // Define a top-level state:
        $stateProvider
            .state('app', {
                //url: '/',
                abstract: true,
                templateUrl: 'views/app.html',
                resolve: helper.loadSequence('cgBusy', 'ApplicationScriptFiles')
            });
        // Define a child state for 'app':
        $stateProvider
            .state('app.products', {
                url: '/products',
                title: 'products',
                templateUrl: helper.basepath('products.html')
            })
            .state('app.topics', {
                url: '/topics',
                title: 'topics',
                templateUrl: helper.basepath('topics.html')
            })
            .state('app.databinding', {
                url: '/databinding',
                title: 'databinding',
                templateUrl: helper.basepath('databinding.html')

            })
            .state('app.myvalidations', {
                url: '/myvalidations',
                title: 'myvalidations',
                templateUrl: helper.basepath('myvalidations.html')
            })
            .state('app.events', {
                url: '/events',
                title: 'events',
                templateUrl: helper.basepath('events.html')
            })
            .state('app.inventory', {
                url: '/inventory',
                title: 'inventory',
                templateUrl: helper.basepath('inventory.html')
            })
            .state('app.promises', {
                url: '/promises',
                title: 'promises',
                templateUrl: helper.basepath('promises.html')
            })
            .state('app.store', {
                url: '/store',
                title: 'store',
                templateUrl: helper.basepath('store.html')
            })
            .state('app.questiontemplate', {
                url: '/questiontemplate',
                title: 'questiontemplate',
                templateUrl: helper.basepath('questiontemplate.html')
            })
            .state('app.shoppingCart', {
                url: '/shoppingCart',
                title: 'shoppingCart',
                templateUrl: helper.basepath('shoppingCart.html')
            })
            //
            // Page Layout Routes
            // -----------------------------------
            .state('page', {
                abstract: true,
                templateUrl: '/pages/page.html',
                resolve: helper.loadSequence('cgBusy', 'ApplicationScriptFiles'),
                controller: ['$rootScope', function ($rootScope) {

                }]
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: '/pages/login.html'
            })
            .state('page.register', {
                url: '/register',
                title: 'Register',
                templateUrl: '/pages/register.html'
            })
            .state('page.error', {
                url: '/error',
                title: 'error',
                templateUrl: '/pages/error.html'
            })
            .state('page.default', {
                url: '/default',
                title: 'Default',
                templateUrl: '/pages/default.html'
            });

    } // routesConfig
})();

//03 app.bootstrapui
(function () {
    'use strict';
    angular
        .module('app.bootstrapui', []);
})();

//04 Interceptors
(function () {
    'use strict';
    angular
        .module('app.authroute', []);
})();

(function () {
    'use strict';

    angular
        .module('app.authroute')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$injector', '$window', '$cookies', function ($q, $location, $localStorage, $injector, $window, $cookies) {
                return {
                    'request': function (config) {
                        //if (sessionStorage["Authheader"]) {
                        //    var Scheme = "poc ";
                        //    var Parameter = sessionStorage["Authheader"];
                        //    config.headers = { 'Authorization': Scheme + Parameter };
                        //}
                        config.headers = config.headers || {};
                        if (config.url.indexOf('views/') != -1 && config.url.indexOf('.html') != -1) {
                            config.url = config.url + '?v=' + $window.jsfileVersion;
                        }
                        else if (config.url.indexOf('pages/') != -1 && config.url.indexOf('.html') != -1) {
                            config.url = config.url + '?v=' + $window.jsfileVersion;
                        }
                        else if (config.url.indexOf('dataModels/') != -1 && config.url.indexOf('.json') != -1) {
                            config.url = config.url + '?v=' + $window.jsfileVersion;
                        }
                        else if (config.url.indexOf('scripts/') != -1 && config.url.indexOf('.js') != -1) {
                            config.url = config.url + '?v=' + $window.jsfileVersion;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 400 || response.status === 401 || response.status === 403) {
                            $localStorage.$reset();
                            //$localStorage.$save();
                            $injector.get('$state').transitionTo('page.error');
                            $window.location.reload();
                        }
                        return $q.reject(response);
                    }
                };
            }]);
        }]);
})();
angular.module('app')
    .run(function ($templateCache) {
        $templateCache.put('custom-busy.html',
            "<div class=\"cssload-loader\"><div class=\"cssload-inner cssload-one\"></div><div class=\"cssload-inner cssload-two\"></div><div class=\"cssload-inner cssload-three\"></div></div>"
        );
    });



