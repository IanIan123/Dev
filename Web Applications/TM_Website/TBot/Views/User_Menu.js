angular.module('ng')

.directive('userMenu', ['$compile', '$http', function ($compile) {

    return {
        restrict: 'E',
        templateUrl: '/TBot/Views/User_Menu.htm'
    };
} ]);