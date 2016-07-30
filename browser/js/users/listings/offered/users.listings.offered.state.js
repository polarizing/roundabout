app.config(function ($stateProvider) {
    $stateProvider.state('users.listings.offered', {
        url: '/offered',
        templateUrl: 'js/users/listings/offered/users.listings.offered.html',
        controller: 'UserListingsOffered'
    });
});