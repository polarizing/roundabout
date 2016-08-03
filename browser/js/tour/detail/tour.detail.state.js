app.config(function ($stateProvider) {
    $stateProvider.state('tour', {
        url: '/tours/:id/:guideId',
        templateUrl: 'js/tour/detail/tour.detail.html',
        controller: 'TourDetail as ctrl',
        resolve: {
        	tour: function (Tour, $stateParams) {
        		return Tour.fetch($stateParams.id);
        	},

            reviews: function(Tour, $stateParams) {
                console.log('reviews',$stateParams.guideId);
                var guideId = $stateParams.guideId || $stateParams.id;
                return Tour.reviews(guideId);
            }
        }
    });
});