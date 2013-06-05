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

    AddPasswordCompareValidation();

    var userName = window.location.search.substring(1);
    if (userName != "") {
        $http.get('/rest/user/' + userName).success(function (data) {
            $scope.userData = data;
        });
    }
}

 function AddPasswordCompareValidation() {

    var confirmPassword = angular.element(document.getElementById("confirmPassword"));
    
       confirmPassword.bind("input", function () {

        var errorMessage;

        if (confirmPassword.val() != angular.element(document.getElementById("newPassword")).val()) {
            errorMessage = "Please make sure this is the same as your new password.";
        } else {
            errorMessage = "";
        }

      confirmPassword[0].setCustomValidity(errorMessage);
    });
}