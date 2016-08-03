app.factory('Cart', function(_, $kookies, Tour, $log, Session, $q, Order, $rootScope) {
    var Cart = {};

    Cart.empty = function() {
        let currentCart = $kookies.get();
        let tours = [];
        for (var items in currentCart) {
            tours.push(currentCart[items])
            $kookies.remove(items, { path: '/' })
        }

        $rootScope.$broadcast('checkout', 1)
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
        var _tour = _.cloneDeep(tour)
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
            _tour['description'] = _tour['description'].substr(0, 200) + '...'
            // tour = _.omit(tour, ['description'])
            console.log(_tour)
            $kookies.set(tour.id.toString(), _tour, { path: '/' });
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
