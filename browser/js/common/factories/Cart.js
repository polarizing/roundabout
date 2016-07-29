app.factory('Cart', function($kookies, Tour, $log, Session, $q) {
  var Cart = {};

  Cart.empty = function(arr) {
    let currentCart = $kookies.get();
    let tours = [];
    for (var items in currentCart) {
      tours.push(currentCart[items])
      $kookies.remove(items, {path: '/'})
    }

    return tours;
  }

  Cart.bookAll = function() {

    var tourArr = Cart.empty();

    var promises = tourArr.map(tour => Tour.book(tour, Session.user));

    return $q.all(promises)
  }

  Cart.add = function(tour) {
    if ($kookies.get(tour.id.toString())) $log.info('item already exists');
    else $kookies.set(tour.id.toString(), tour, {path: '/'});
  }

  Cart.remove = function(tour) {
    if ($kookies.get(tour.id.toString())) $kookies.remove(tour.id.toString(), {path: '/'})
  }

  return Cart
})
