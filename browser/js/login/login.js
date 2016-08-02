app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $log, $kookies) {

    $scope.login = {};
    $scope.signup = {};
    $scope.error = {};

    $scope.sendLogin = function (loginInfo, cart) {

        $scope.error = {};

        AuthService.login(loginInfo).then(function () {
            if (!$kookies.get('cart')) {
                $state.go('home');
            }
            else {
                $kookies.remove('cart', {path: '/'})
                $state.go('checkout')
            }
        }).catch(function () {
            $scope.error.login = 'Invalid login credentials.';
        });

    };

    $scope.sendSignup = function (signupInfo, cart) {
        $log.warn(signupInfo)
        console.log(signupInfo)
        $scope.error = {};

        AuthService.signup(signupInfo)
        .then(function() {
            console.log("HELLO FROM THE OTHER SIDE")
            return AuthService.login(signupInfo)
        })
        .then(function() {
            if (!$kookies.get('cart')) {
                $state.go('home');
            }
            else {
                $kookies.remove('cart', {path: '/'})
                $state.go('checkout')
            }
        })
        .catch(function() {
            $scope.error.signup = 'User already exists'
        })

    }

});
