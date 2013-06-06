angular.module('ng').directive('repeatString', function () {
    return {
        require: "ngModel",
        link: function (scope, elem, attrs, ctrl) {
            
            var otherInput = elem.inheritedData("$formController")[attrs.repeatString];

            ctrl.$parsers.push(function (value) {
                var valid = CompareStrings(value, otherInput);
                Update(ctrl, valid);
            });

            otherInput.$parsers.push(function (value) {
                var valid = CompareStrings(value, ctrl);
                Update(ctrl, valid);
            });
        }
    };
});

function CompareStrings(value, otherInput) {
    var stringsEqual = (value === otherInput.$viewValue);
    return stringsEqual;
}

function Update(ctrl, valid) {
    ctrl.$setValidity("repeat", valid);
    var errorMessage = valid ? "" : "Please make sure this is the same as your new password.";
    var confirmPassword = angular.element(document.getElementById("confirmPassword"));
    confirmPassword[0].setCustomValidity(errorMessage);
}