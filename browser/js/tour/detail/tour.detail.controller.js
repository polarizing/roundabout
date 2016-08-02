'use strict';

app.controller('TourDetail', function ($rootScope, $scope, fileUpload, tour, reviews, $state, Tour, Session, Cart, Order) {


	$scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);

        var uploadUrl = "/upload";

        if (['jpeg', 'png','jpg'].includes(file.name.split(".").pop()) && file.size < 5000000)
        	fileUpload.uploadFileToUrl(file, uploadUrl)
        		  .then(function (res) {
        		  	console.log(res.data);
        		  });
        else alert('Please upload a valid image of type .jpeg, .png, or .jpg of less than 5MB.')

    };
	
	// $scope.uploadPhoto = function(){
	// 	console.log('prevented default action');


	//   var f = document.getElementById('photo').files[0],
	//       r = new FileReader();

	//       console.log('this is f: ' , f);
	// 	  r.onloadend = function(e){
	// 	  	// console.log('ishaan is here');
	// 	    var data = e.target.result;
	// 	    $http.post('/upload', data)
	// 	    	 .then(function (res) {
	// 	    	 	console.log(res);
	// 	    	 })
	// 	    	 .catch(function (err) {
	// 	    	 	console.log(err);
	// 	    	 })
	// 	    // console.log('data', data);
	// 	    //send your binary data via $http or $resource or do anything else with it
	// 	  }
	// 	  r.readAsBinaryString(f);
	// }
	// DATE WIDGET
	$scope.reviews = reviews;
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


	// $scope.onStart = function () {
	// 	console.log('onStart');
	// };
	// $scope.onRender = function () {
	// 	console.log('onRender');
	// };
	// $scope.onOpen = function () {
	// 	console.log('onOpen');
	// };
	// $scope.onClose = function () {
	// 	console.log('onClose');
	// };
	// $scope.onSet = function () {
	// 	console.log('onSet');
	// };
	// $scope.onStop = function () {
	// 	console.log('onStop');
	// };

	// END DATE WIDGET


	$scope.addedToCart = false;
	$scope.book = function() {

		Order.create(Session.user.id)
		.then(function(order) {
			return Tour.book($scope.tour, Session.user, order.id)
		})
		.then(function() {
			$state.go('tours')
		})
	};

	$scope.toggleAddToCart = function(tour) {
		if ($scope.addedToCart) {
			var successfullyRemoved = Cart.remove(tour)
			if (successfullyRemoved) $rootScope.$broadcast('removed from cart', 1)
		}
		else {
			var successfullyAdded = Cart.add(tour)
			if (successfullyAdded) $rootScope.$broadcast('added to cart', 1);
		}
		$scope.addedToCart = !$scope.addedToCart;
	}

	$scope.getNumber = function(number){
		return new Array(number);
	}

	$scope.getAvgRev = function(){
		var num = 0;
		$scope.reviews.forEach(function(rev){
			num += rev.rating;
		})
		if(num === 0){
			return "";
		} else {
			return new Array(Math.floor(num / $scope.reviews.length));
		}
	}

	$scope.getNumRev = function(){
		if(!$scope.reviews.length){
			return "no reviews";
		}else {
			return $scope.reviews.length;
		}
	}

		console.log($scope.reviews);
});
