'use strict';

app.controller('UserToursBooked', function ($scope, $timeout, $state, Session, $kookies, $log, User, $stateParams, $location, Cart, $rootScope) {

  $scope.bookedAlertMessage = false;

  if ($location.search().stripeToken) {
    Cart.bookAll()
    .then(function() {
      return User.getUserBookings(Session.user.id)
     })
    .then( function (res) {
      console.log('this is res', res);
      $scope.bookings = res;
      $rootScope.$broadcast('checkout', 1);
      $scope.bookedAlertMessage = true; 
      $timeout(function () { $scope.bookedAlertMessage = false; }, 4000);   
    })
  }

	 User.getUserBookings(Session.user.id)
	 	 .then( function (res) {
	 	 	console.log('this is res', res);
	 	 		$scope.bookings = res;
	 	 });


	console.log($scope.bookings);
	// $scope.bookings = bookings;
});
        // resolve: {
        //     bookings: function (User, Session) {
        //     	console.log('session', Session.user);
        //         console.log(User.getUserBookings(Session.user.id));
        //         return User.getUserBookings(Session.user.id);
        //     }
        // },

// 'use strict';

// app.controller('UserProfileEdit', function ($scope, $state, Session, $kookies, User, $log) {
// 	$scope.user = {
// 		id: Session.user.id,
// 		name: Session.user.name,
// 		photo: Session.user.photo,
// 		email: Session.user.email,
// 		phone: Session.user.phone,
// 	}
// 	console.log(Session.user);
// 	$scope.editUser = function(){
// 		// if(User.encryptPassword(Session.user.oldpassword, Session.user.salt) === User.password){
// 			User.edit($scope.user)
// 		}
// });
