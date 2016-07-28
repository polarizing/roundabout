'use-strict'

app.directive('bookNow', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/booking/booknow/booknow.html',
    controller: 'BookNow'
  }
})
