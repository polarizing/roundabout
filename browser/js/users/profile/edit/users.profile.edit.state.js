app.config(function ($stateProvider) {
    $stateProvider.state('users.profile.edit', {
        url: '/edit',
        templateUrl: 'js/users/profile/edit/users.profile.edit.html',
        controller: 'UserProfileEdit'
    });
});