app.config(function ($stateProvider) {
    $stateProvider.state('users.listings.offered', {
        url: '/offered',
        templateUrl: 'js/users/listings/offered/users.listings.offered.html',
        controller: 'UserListingsOffered',
        resolve: {
            tours: function (Tour, Session, AuthService) {
            	return AuthService.getLoggedInUser()
    					  .then(user => {
    					  	return Tour.queryAllByGuide(Session.user.id, {booked: false})
    					  })
            }
        },
    });
});