'use strict';

app.controller('UserListings', function ($scope, $state, Session, $kookies, $log) {

	$scope.items = [
                { label: 'Offered Tours', state: 'users.listings.offered', auth: true},
                { label: 'Completed Tours', state: 'users.listings.completed', auth: true },
  ];

});
