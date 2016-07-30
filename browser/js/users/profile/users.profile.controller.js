'use strict';

app.controller('UserProfile', function ($scope, $state, Session, $kookies, $log) {

	$scope.items = [
                { label: 'Edit Profile', state: 'users.profile.edit', auth: true},
                { label: 'Photos', state: 'users.profile.photos', auth: true },
                { label: 'Reviews', state: 'users.profile.reviews', auth: true },
                { label: 'Verification', state: 'users.profile.verification', auth: true },
            ];

    $state.go('users.profile.edit')

});
