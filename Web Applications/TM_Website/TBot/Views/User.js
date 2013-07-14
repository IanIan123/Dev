var app = angular.module('ng').
        config(function ($routeProvider) {
            $routeProvider.
                when('/View/:userName', {
                    templateUrl:
                        function ($routeParams) {
                            return '/rest/tbot/run/User_View?userName=' + $routeParams.userName;
                        }
                }).
                when('/Activities/:userName/:max', {
                    templateUrl:
                        function($routeParams) {
                            return '/rest/tbot/run/User_Activities?userName=' + $routeParams.userName + '&max=' + $routeParams.max;
                        }
                }).
                when('/Raw/:userName', {
                    templateUrl:
                        function($routeParams) {
                            return '/rest/tbot/run/User_Raw?userName=' + $routeParams.userName;
                        }
                    }).
                when('/Edit/:userName', { templateUrl: '/rest/tbot/run/User_Edit', controller: TMUser }).
                when('/Password/:userName', { templateUrl: '/rest/tbot/run/User_Password', controller: TMUserPassword });
        });