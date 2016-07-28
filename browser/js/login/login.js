app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $log) {

    $scope.login = {};
    $scope.signup = {};
    $scope.error = {};

    $scope.sendLogin = function (loginInfo) {

        $scope.error = {};

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error.login = 'Invalid login credentials.';
        });

    };

    $scope.sendSignup = function (signupInfo) {
        $log.warn(signupInfo)
        console.log(signupInfo)
        $scope.error = {};

        AuthService.signup(signupInfo)
        .then(function() {
            console.log("HELLO FROM THE OTHER SIDE")
            return AuthService.login(signupInfo)
        })
        .then(function() {
            $state.go('home')
        })
        .catch(function() {
            $scope.error.signup = 'User already exists'
        })

    }

});
