'use strict';

app.controller('Cart', function ($scope, $state, Cart, AuthService, $kookies, Session) {
	$scope.cart = Cart.getAll();
	$scope.numItems = $scope.cart.length;

	$scope.totalPrice = calculateTotal($scope.cart);

	if(!Session.user) $state.go('login')
	function calculateTotal (tours) {
		var total = 0;
		tours.forEach( tour => total += tour.price);
		return total;
	}

	$scope.checkout = function() {
		if (!!AuthService.isAuthenticated()) {
			$state.go('checkout')
		} else {
			$kookies.set('cart', true, {path: '/'});
			$state.go('login');
		}
	}

});
