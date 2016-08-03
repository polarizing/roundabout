app.config(function ($stateProvider) {
    $stateProvider.state('users.listings.completed', {
        url: '/completed',
        templateUrl: 'js/users/listings/completed/users.listings.completed.html',
        controller: 'UserListingsCompleted',
        resolve: {
            bookings: function ($http, Session, AuthService) {
            	return AuthService.getLoggedInUser()
    					  .then(user => {
    					  	return $http.get('/api/bookings/guide/' + Session.user.id)
                                        .then(function (res) { console.log(res.data); return res.data })
    					  })
            }
        },
    });
});

