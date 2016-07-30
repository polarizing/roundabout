'use strict';

app.controller('UserTours', function ($scope, $state, Session, $kookies, $log, bookings) {
	$scope.bookings = bookings;
});
