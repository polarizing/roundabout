'use strict';

app.controller('TourAdd', function($scope, Tour, $state, Session) {
    $scope.tour = {
        name: null,
        description: null,
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
        tags: [],
        guideId: Session.user.id
    }
    $scope.addTour = function() {
            // console.log(Session.user.id);
        // $scope.tour.guide = Session.user.id;
        console.log("in controller")
        Tour.create($scope.tour)
        .then(function(tour) {
                        console.log(tour);

            $state.go('tour', { id: tour.id })
        })
    }

})
