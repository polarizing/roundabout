'use-strict'

app.factory('User', function($http, $rootScope) {

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

  User.create = function(user){
    return $http.post('/api/users', {
                name: user.name,
                photo: user.photo,
                email: user.email,
                phone: user.phone,
                password: user.password
            })
            .then(function(response) {
                return response.data
            })
  }

  User.edit = function(user) {
      console.log(user);
      return $http.put('/api/users/' + user.id, {
               name: user.name,
               photo: user.photo,
               phone: user.phone,
               email: user.email,
               password: user.newpassword
            })
            .then(function(resp){
              console.log('about to log event')
              $rootScope.$emit('edit profile', resp.data);
              return resp.data;
            })
  }

  return User;
})
