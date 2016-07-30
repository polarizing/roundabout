app.config(function ($stateProvider) {
    $stateProvider.state('users.profile.reviews', {
        url: '/reviews',
        templateUrl: 'js/users/profile/reviews/users.profile.reviews.html',
        controller: 'UserProfileReviews'
    });
});