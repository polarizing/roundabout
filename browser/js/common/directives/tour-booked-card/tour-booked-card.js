app.directive('tourBookedCard', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tour-booked-card/tour-booked-card.html',
        scope: { booking: '=bookingData'},
    };

});