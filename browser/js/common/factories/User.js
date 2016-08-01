'use-strict'

app.factory('User', function($http) {

  var User = {};

  User.getUserBookings = function(id) {
    return $http.get('/api/users/u/'+id+'/bookings')
    .then(bookings => bookings.data)
  }

  User.getUserOrders = function(id) {
    return $http.get('/api/users/'+id+'/orders')
    .then(orders => orders.data)
  }

  User.getGuideBookings = function(id) {
    return $http.get('/api/users/g/'+id+'/bookings')
    .then(bookings => bookings.data);
  }


  User.fetchAll = function () {
    return $http.get('/api/users/')
                .then(user => user.data)
  }

// THESE TWO BELOW ARE DEFUNCT, ARE WE STILL USING THEM?
  User.getOfferedTours = function(id) {
    return $http.get('/api/user/'+id+'/tours')
    .then(tours => tours.data)
  }
 
  User.getUserInfo = function (id) {
    return $http.get('/api/user/' + id)
                .then(user => user.data)
  }



  return User;
})
