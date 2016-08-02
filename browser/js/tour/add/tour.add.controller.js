'use strict';

app.controller('TourAdd', function($scope, Tour, AuthService, $state, Session) {
    $scope.tour = {
        location: null,
        name: null,
        description: null,
        image: null,
        expire_in:  {
            value: 30,
            options: {
                floor: 0,
                ceil: 1200,
                translate: function(value) {
                    return value;
                }
            }
        },
        price: {
            value: 150,
            options: {
                floor: 0,
                ceil: 450,
                translate: function(value) {
                    return '$' + value;
                }
            }
        },
        duration: {
            value: 90,
            options: {
                floor: 45,
                ceil: 300,
                translate: function(value) {
                    return value;
                }
            }
        },
        tags: [],
        guideId: null

    }

    if (AuthService.isAuthenticated()) {
        $scope.tour.guideId = Session.user.id;
    }
    $scope.addTour = function() {
        // console.log(Session.user.id);
        // $scope.tour.guide = Session.user.id;
        Tour.create($scope.tour)
        .then(function(tour) {
            $state.go('tour', { id: tour.id })
        })
    }

})
