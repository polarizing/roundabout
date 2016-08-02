'use strict';

app.controller('Review', function($scope, Review, $state, $stateParams, Tour, AuthService, Session, $interval) {
    
    $scope.review = {
        title: null,
        content: null,
        rate: 3,
        guideId: null,
        userId: null
    }

    if (AuthService.isAuthenticated()) {
        $scope.review.userId = Session.user.id;
    }

    Tour.fetch($stateParams.id)
    .then(function(tour) {
        $scope.tour = tour
        $scope.review.guideId = tour.guide.id
    })

    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };

    $scope.addReview = function(review) {
        Review.create(review)
        .then(function() {
            $scope.reviewed = true
            $scope.countDown = 3
            $interval(function() {
                $scope.countDown--
            }, 1000, 3)
            .then(function() {
                $state.go('tours')
            })
        })
    }

})
