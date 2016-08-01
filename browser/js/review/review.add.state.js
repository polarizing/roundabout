app.config(function ($stateProvider) {
    $stateProvider.state('addReview', {
        url: '/tours/:id/review',
        templateUrl: 'js/review/review.add.html',
        controller: 'Review',
        resolve: {
            TourInfo: function() {

            }
        }
    });
});
