'use strict';

app.controller('TourAdd', function($scope, Tour) {
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

    }

})
