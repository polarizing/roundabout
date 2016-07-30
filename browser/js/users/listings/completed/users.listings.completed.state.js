app.config(function ($stateProvider) {
    $stateProvider.state('users.listings.completed', {
        url: '/completed',
        templateUrl: 'js/users/listings/completed/users.listings.completed.html',
        controller: 'UserListingsCompleted'
    });
});