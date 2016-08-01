'use strict';

app.controller('Cart', function ($scope, $state, Cart) {
	$scope.cart = Cart.getAll();
	$scope.numItems = $scope.cart.length;

	$scope.totalPrice = calculateTotal($scope.cart);
	function calculateTotal (tours) {
		var total = 0;
		tours.forEach( tour => total += tour.price);
		return total;
	}

	$scope.test = function () {
		console.log('hi');
	}
});
