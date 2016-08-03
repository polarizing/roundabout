 'use strict';

app.controller('Checkout', function($scope, $state, Cart) {
   $scope.bookAll = function() {
       return Cart.bookAll().then(function() {
          $state.go('tours')


       })
   }
});
