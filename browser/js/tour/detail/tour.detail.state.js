app.config(function ($stateProvider) {
    $stateProvider.state('tour', {
        url: '/tours/:id',
        templateUrl: 'js/tour/detail/tour.detail.html',
        controller: 'TourDetail as ctrl',
        resolve: {
        	tour: function (Tour, $stateParams) {
        		return Tour.fetch($stateParams.id);
        	}
        }
    });
});