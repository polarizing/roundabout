app.config(function ($stateProvider) {
    $stateProvider.state('users.profile.photos', {
        url: '/photos',
        templateUrl: 'js/users/profile/photos/users.profile.photos.html',
        controller: 'UserProfilePhotos'
    });
});