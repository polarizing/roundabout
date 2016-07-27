app.config(function ($stateProvider) {
    $stateProvider.state('tour', {
        url: '/tours/:id',
        templateUrl: 'js/tour/detail/tour.detail.html',
        controller: 'TourDetail',
        resolve: {
        	tour: function (Tour, $stateParams) {
        		return Tour.fetch($stateParams.id);
        	}
        }
    });
});