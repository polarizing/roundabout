'use strict';

app.controller('TourDetail', function ($scope, tour, $state, Tour, Session, Cart) {

	$scope.tour = tour;
	$scope.numTravellers = "1";
	$scope.numbers = ['1', '2', '3', '4', '5'];
	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.disable = [false, 1, 7];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 15;
	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
	$scope.onStart = function () {
		console.log('onStart');
	};
	$scope.onRender = function () {
		console.log('onRender');
	};
	$scope.onOpen = function () {
		console.log('onOpen');
	};
	$scope.onClose = function () {
		console.log('onClose');
	};
	$scope.onSet = function () {
		console.log('onSet');
	};
	$scope.onStop = function () {
		console.log('onStop');
	};
	$scope.book = function() {
		Tour.book($scope.tour, Session.user)
		.then(function() {
			$state.go('tours')
		})
	};

	$scope.addToCart = function() {
		Cart.add(tour)
	}
});
