function TMUser($scope, $http) {
    $scope.update = function (userData) {
        $scope.result = "... saving user";
        $http.put('/rest/user/changePassword', userData)
            .success(function (data) {
                if (data == 'true') {
                    $scope.result = "(User details saved)";
                    // would like to call $pristine but requires newer version of Angular JS.
                }
                else {
                    $scope.result = "Error: Failed to Save user!";
                }
            });
        };

    var userName = window.location.search.substring(1);
    if (userName != "") {
        $http.get('/rest/user/' + userName).success(function (data) {
            $scope.userData = data;
        });
    }
}