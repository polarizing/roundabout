app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $log, $kookies, fileUpload) {

    $scope.login = {};
    $scope.signup = {};
    $scope.error = {};
    $scope.signup.uploaded = false;

    $scope.onSignUp = true;
    $scope.onLogin = false;
    $scope.onOAuthSignUpLogin = false;

    $scope.setOnLogin = function () {
        $scope.onSignUp = false;
        $scope.onLogin = true;
        $scope.onOAuthSignUpLogin = false;
    }

    $scope.setOnSignUp = function () {
        $scope.onSignUp = true;
        $scope.onLogin = false;
        $scope.onOAuthSignUpLogin = false;
    }

    $scope.setOnOAuthSignUpLogin = function () {
        $scope.onOAuthSignUpLogin = true;
        $scope.onLogin = false;
        $scope.onSignUp = false;


    }




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

    $scope.testSignup = function () {
        $state.go('tours');
    }

    $scope.sendSignup = function (signupInfo, cart) {
        $log.warn(signupInfo)
        console.log(signupInfo)
        $scope.error = {};

       // if (!signupInfo.name) signupInfo.name = signupInfo.
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
        .catch(function(err) {
            console.log(err);
            $scope.error.signup = 'User already exists'
        })

    }

    $scope.uploadFile = function(newfile){
       // console.log('this is the flow thingy', $scope.$flow.files[0])
        $log.info('I am here')
        console.log('hello')
        console.log('passing in the newestfile' , newfile)
        var file = newfile.file;
        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "/upload";

        if (['jpeg', 'png','jpg'].includes(file.name.split(".").pop()) && file.size < 5000000)
            fileUpload.uploadFileToUrl(file, uploadUrl)
                  .then(function (res) {
                    $scope.signup.photo = res.data;
                    $scope.uploaded = true;
                  });
        else alert('Please upload a valid image of type .jpeg, .png, or .jpg of less than 5MB.')

    };

});
