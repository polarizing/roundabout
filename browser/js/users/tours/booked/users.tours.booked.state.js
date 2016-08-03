app.config(function ($stateProvider) {
    $stateProvider.state('users.tours.booked', {
        url: '/booked',
        templateUrl: 'js/users/tours/booked/users.tours.booked.html',
        controller: 'UserToursBooked',
        // resolve: {
        //     bookings: function (User, Session) {
        //     	console.log('session', Session.user);
        //         console.log(User.getUserBookings(Session.user.id));
        //         return User.getUserBookings(Session.user.id);
        //     }
        // },
    });
});