'use strict';

app.controller('UserToursBooked', function ($scope, $state, Session, $kookies, $log, User, $stateParams, $location, Cart, $rootScope) {

  if ($location.search().stripeToken && !$kookies.get($location.search().stripeToken)) {
    Cart.bookAll()
    .then(function() {
      $rootScope.$broadcast('checkout', 1)
      $kookies.set($location.search().stripeToken, '1', {path: '/'})
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
