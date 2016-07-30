app.config(function ($stateProvider) {
    $stateProvider.state('users.profile', {
        url: '/profile',
        templateUrl: 'js/users/profile/users.profile.html',
        controller: 'UserProfile',
        // abstract: true,
        redirectTo: 'users.profile.edit'
    });
});