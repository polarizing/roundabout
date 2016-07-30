app.config(function ($stateProvider) {
    $stateProvider.state('users.profile.verification', {
        url: '/verification',
        templateUrl: 'js/users/profile/verification/users.profile.verification.html',
        controller: 'UserProfileVerification'
    });
});