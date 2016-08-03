app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, Cart) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.cart = {};
            scope.cart.items = Cart.getAll();
            initCart();

            function initCart() {

                function calculateTotal (tours) {
                    var total = 0;
                    tours.forEach( tour => total += tour.price);
                    return total;
                }

                scope.cart.items = Cart.getAll();
                scope.cart.numItems = scope.cart.items.length;
                scope.cart.totalPrice = calculateTotal(scope.cart.items);
            }


            // BROADCAST FROM OUTSIDE STATES / VIEWS

            $rootScope.itemsInCart = Cart.getAll().length;
            scope.itemsInCart = $rootScope.itemsInCart;

            $rootScope.$on('added to cart', function(event, data) {
                scope.itemsInCart += 1;
                initCart();
            })
            
            $rootScope.$on('removed from cart', function(event, data) {
                scope.itemsInCart -= 1;
                initCart();

            })

            $rootScope.$on('checkout', function (event, data) {
                scope.itemsInCart = 0;
                initCart();
            })
            

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Tours', state: 'tours' },
                { label: 'My Dashboard', state: 'users', auth: true},
                { label: 'My Inbox', state: 'users.inbox', auth: true}
                // { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                Cart.empty();
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
            $rootScope.$on('edit profile', function(event, data){
                scope.user = data;
                scope.$evalAsync();
            });

        }

    };

});
