'use strict';

app.controller('TourAdd', function($scope, Tour, $state) {
    $scope.slider = {
        value: 150,
        options: {
            floor: 0,
            ceil: 450,
            translate: function(value) {
                return '$' + value;
            }
        }
    }
    $scope.tour = {
        name: null,
        description: null,
        price: $scope.slider.value,
        tags: []
    }
    $scope.addTour = function() {
        console.log("in controller")
        Tour.create($scope.tour)
        .then(function(tour) {
            $state.go('tour', { id: tour.id })
        })
    }

})
