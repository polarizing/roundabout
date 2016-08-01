app.directive('tourCartCard', ['Cart', function (Cart) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tour-cart-card/tour-cart-card.html',
        scope: { tour: '=cartData'},
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
        	$scope.removed = false;
        	$scope.removeFromCart = function () {
        		$scope.removed = true;
	        	// console.log($scope.$parent.$parent);
	        	console.log('here', $scope.tour)
				var successfullyRemoved = Cart.remove($scope.tour)
					        	console.log(successfullyRemoved)

				if (successfullyRemoved) $rootScope.$broadcast('removed from cart', 1);
        	}

        }],
        link: function (scope) {
        	console.log(scope)
        	// Cart.remove(scope.tour);
        }
    };

}]);