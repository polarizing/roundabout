'use-strict'

app.controller('BookNow', function ($scope, $state, $log, Session, $http) {
  $scope.book = function() {
    $log.info(Session.user)
    $log.info($scope.tour)
    $state.go('home')
  }
});
