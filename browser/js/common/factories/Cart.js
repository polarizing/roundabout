app.factory('Cart', function(_, $kookies, Tour, $log, Session, $q, Order) {
    var Cart = {};

    Cart.empty = function() {
        let currentCart = $kookies.get();
        let tours = [];
        for (var items in currentCart) {
            tours.push(currentCart[items])
            $kookies.remove(items, { path: '/' })
        }

        return tours;
    }

    Cart.getAll = function () {
        var currentCart = $kookies.get();
        var tours = [];
        for (var items in currentCart) {
            tours.push(currentCart[items]);
        }
        return tours;
    }

    Cart.bookAll = function() {

        var tourArr = Cart.empty();
        $log.info(tourArr)
        return Order.create(Session.user.id)
            .then(function(order) {
                var promises = tourArr.map(tour => Tour.book(tour, Session.user, order.id));
                return $q.all(promises)
            })

    }

    Cart.add = function(tour) {
        console.log(tour);
        if ($kookies.get(tour.id.toString())) {
            console.log('test')
            $log.info('item already exists');
            return false;
        }
        else {
                        // console.log('test2')
                        // console.log(tour.id.toString());
                        // console.log(tour);
                        // delete tour[description];
            tour['description'] = tour['description'].substr(0, 200) + '...'
            // tour = _.omit(tour, ['description'])
            $kookies.set(tour.id.toString(), tour, { path: '/' });
            console.log('cookies', $kookies.get())
            return true;
        }
    }

    Cart.remove = function(tour) {
        console.log('in cart factory', tour);
        if ($kookies.get(tour.id.toString())) {
            
            $kookies.remove(tour.id.toString(), { path: '/' })
            return true;
        }
    }

    return Cart
})
