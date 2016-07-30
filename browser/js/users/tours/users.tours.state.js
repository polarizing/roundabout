app.config(function ($stateProvider) {
    $stateProvider.state('users.tours', {
        url: '/tours',
        templateUrl: 'js/users/tours/users.tours.html',
        controller: 'UserTours',
        resolve: {
        	tours: function (Tour, $stateParams) {
        		console.log(Tour.fetchAll());
        		return Tour.fetchAll();
        	}
        },
    });
});