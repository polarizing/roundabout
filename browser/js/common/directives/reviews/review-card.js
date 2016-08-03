app.directive('reviewCard', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/reviews/review-card.html',
        scope: { review: '=reviewData', user: '=userData'},
        controller: function($scope, User){
        	$scope.getNumber = function(num){
        		return new Array(num);
        	},

        	$scope.getUser = function(id){
				return User.getUserInfo(id);
			}
        }
    };

});