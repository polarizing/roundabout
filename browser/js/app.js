'use strict';
window.app = angular.module('FullstackGeneratedApp', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial', 'ui.materialize', 'auto-complete', 'ngKookies', 'rzModule', 'luegg.directives', 'smart-table', 'hm.readmore', 'flow', 'anim-in-out'])
.config(['$kookiesProvider',
        function ($kookiesProvider) {
            $kookiesProvider.config.json = true;
        }
        ]);
// allow DI for use in controllers, unit tests
app.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
app.run(function ($rootScope) {
 $rootScope._ = window._;
});

// prevent auto-default saving scrollbar place on view change
app.run(function($rootScope, $state, $anchorScroll, $stateParams){
    $rootScope.$on("$locationChangeSuccess", function(){
        console.log('in appjs', $state.params)
        console.log('part2',$stateParams)
        $anchorScroll();
    })
});

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
    // Trigger page refresh when accessing an OAuth route
    $urlRouterProvider.when('/auth/:provider', function () {
        window.location.reload();
    });
    // Redirections for abstract parent states. .. https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-set-up-a-defaultindex-child-state
    $urlRouterProvider.when('/users', '/users/profile/edit');
    $urlRouterProvider.when('/users/listings', '/users/listings/offered');
    $urlRouterProvider.when('/users/profile', '/users/profile/edit');
    $urlRouterProvider.when('/users/tours', '/users/tours/booked');
});



// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {


    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
          });

});
