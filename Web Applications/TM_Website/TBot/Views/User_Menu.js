app.controller('MenuController', ['$scope', '$route', '$location', function ($scope, $route, $location) {

    $scope.userName = $route.current.params.userName;

    $scope.isCurrent = function (path) {
        var currPath = $location.path().substr(0, path.length);

        if (currPath == path) {
            return true;
        } else {
            return false;
        }

    };

} ]).directive('userMenu', [function () {

    return {
        controller: 'MenuController',
        restrict: 'E',
        templateUrl: '/TBot/Views/User_Menu.htm'
    };
} ]);