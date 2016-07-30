'use-strict';

app.factory('Order', function($http) {

  var Order = {};

  Order.create = function(id) {
    return $http.post('/api/orders', {id: id})
    .then(res => res.data)
  };

  Order.getOrder = function(id) {
    return $http.get('/api/orders/:id')
    .then(res => res.data)
  }

  return Order

})
