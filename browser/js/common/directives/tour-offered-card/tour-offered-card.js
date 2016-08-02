app.directive('tourOfferedCard', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tour-offered-card/tour-offered-card.html',
        scope: { tour: '=tourData'},
    };

});