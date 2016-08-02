'use strict';

app.controller('UserListingsCompleted', function ($scope, $state, Session, $kookies, $log, bookings) {
	$scope.bookings = bookings;
});
