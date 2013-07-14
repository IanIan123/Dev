function TMUser($scope, $http, $routeParams) {
    $scope.update = function (userData) {
        $scope.result = " ... saving user";

        var picker = $('#expirationDate').datetimepicker();

        var selectedDate = picker.data('datetimepicker').getLocalDate();

        userData.ExpirationDate = "\/Date(" + Date.parse(selectedDate) + ")\/";

        $http.put('/rest/user', userData)
                    .success(function (data) {
                        $scope.result = (data) ? "(User details saved)" : "Error: Failed to Save user!";
                    })
                    .error(function () {
                        $scope.result = "Error: Failed to Save user!";
                    });
    };

                var userName = $routeParams.userName;

    if (userName != "") {
        $scope.userName = userName;
        $http.get('/rest/user/' + userName).success(function (data) {
            $scope.userData = data;

            var currentExpirationDate = new Date(parseInt($scope.userData.ExpirationDate.replace("/Date(", "").replace(")/", ""), 10));

            var picker = $('#expirationDate').datetimepicker();

            picker.data('datetimepicker').setLocalDate(currentExpirationDate);
        });
    }
    else
        $scope.userName = "No username provided";
}