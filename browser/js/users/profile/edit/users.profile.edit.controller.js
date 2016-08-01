'use strict';

app.controller('UserProfileEdit', function ($scope, $state, Session, $kookies, User, $log) {
	$scope.user = {
		id: Session.user.id,
		name: Session.user.name,
		photo: Session.user.photo,
		email: Session.user.email,
		phone: Session.user.phone,
	}
	console.log(Session.user);
	$scope.editUser = function(){
		// if(User.encryptPassword(Session.user.oldpassword, Session.user.salt) === User.password){
			User.edit($scope.user)
		}
});
