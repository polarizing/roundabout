app.directive('sidebar', function ($rootScope, $state) {

    return {
        restrict: 'E',
        scope: {
            items: '='
        },
        templateUrl: 'js/common/directives/sidenav/sidenav.html',
        link: function (scope) {
            scope.$watch('items', function () {
                
            })
        }

    };

});
