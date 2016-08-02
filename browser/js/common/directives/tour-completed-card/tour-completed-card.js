app.directive('tourCompletedCard', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tour-completed-card/tour-completed-card.html',
        scope: { booking: '=bookingData'},
    };

});