app.directive('tourCard', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tour-card/tour-card.html',
        scope: { tour: '=tourData'},
        // link: function (scope) {
        // 	console.log(scope);
        //     // scope.greeting = RandomGreetings.getRandomGreeting();
        // }
    };

});