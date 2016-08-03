app.directive('subnav', function ($rootScope, $state, AuthService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/subnav/subnav.html',
        link: function (scope) {

            scope.items = [
                { label: 'Inbox', state: 'users.inbox', auth: true },
                { label: 'Your Listings', state: 'users.listings', auth: true },
                { label: 'Your Tours', state: 'users.tours', auth: true },
                { label: 'Profile', state: 'users.profile', auth: true },
            ];


            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
        }

    };

});
