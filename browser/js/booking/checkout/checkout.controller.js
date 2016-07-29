'use strict';

app.controller('Checkout', function ($scope, $state, Session, $kookies, $log, Cart, $q) {

  $scope.bookAll = function() {
    return Cart.bookAll().then(function() {$state.go('tours')})
  }
});
