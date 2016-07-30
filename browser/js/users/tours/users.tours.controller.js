'use strict';

app.controller('UserTours', function ($scope, $state, Session, $kookies, $log, tours) {
	$scope.tours = tours;
});
