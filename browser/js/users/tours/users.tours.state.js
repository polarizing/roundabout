app.config(function ($stateProvider) {
    $stateProvider.state('users.tours', {
        url: '/tours',
        templateUrl: 'js/users/tours/users.tours.html',
        controller: 'UserTours',
        resolve: {
        	bookings: function (User, Session) {
        		console.log(User.getUserBookings(Session.user.id));
        		return User.getUserBookings(Session.user.id);
        	}
        },
    });
});