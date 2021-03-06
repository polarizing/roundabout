'use strict';

app.controller('UserProfileEdit', function ($scope, $rootScope, $state, Session, $kookies, User, $log) {
	$scope.user = {
		id: Session.user.id,
		name: Session.user.name,
		photo: Session.user.photo,
		email: Session.user.email,
		phone: Session.user.phone,
	}

	$scope.editUser = function(){
		// if(User.encryptPassword(Session.user.oldpassword, Session.user.salt) === User.password){
			User.edit($scope.user) //the comment above is some code we could possibly use for password authentication on the edit page,
			.then(function(user){ //let's save this for when we get a minimal working product
				$rootScope.user = user;
				$scope.$evalAsync();
				$state.go('tours');
			}).catch($log.error)
		}
});
