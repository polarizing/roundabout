app.config(function ($stateProvider) {
    $stateProvider.state('users.listings', {
        url: '/listings',
        templateUrl: 'js/users/listings/users.listings.html',
        controller: 'UserListings',
        // abstract: true,
        redirectTo: 'users.listings.offered'
    });
});