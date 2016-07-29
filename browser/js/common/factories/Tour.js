app.factory('Tour', function ($http, $log, $kookies) {
    var Tour = {};

    Tour.fetchAll = function () {
        return $http.get('/api/tours')
                    .then(function (response) {
                        return response.data;
                    })
    }

    Tour.queryAll = function (params) {
        return $http.get('/api/tours?' + jQuery.param(params))
                .then(function (response) {
                    return response.data;
                })
    }

    Tour.fetch = function (id) {
        return $http.get('/api/tours/' + id)
                    .then(function (response) {
                        return response.data;
                    })
    }

    Tour.attachGuide = function (tour) {
        return $http.get('/api/users/' + tour.guideId)
             .then(function (response) {
                tour.guide = response.data;
                return tour;
             })
    }

    Tour.book = function(tour, user) {
        $log.info(tour)
        return $http.post('/api/bookings', {userId: user.id, guideId: tour.guideId, tourId: tour.id, price: tour.price})
        .then(function(response) {
            return response.data
        })
    }

    Tour.addToCart = function(tour) {
        if ($kookies.get(tour.id.toString())) $log.info('item already exists')
        else $kookies.set(tour.id.toString(), tour, {path: '/'})
    }

    Tour.removeFromCart = function(tour) {
        if ($kookies.get(tour.id.toString())) $kookies.remove(tour.id.toString(), {path: '/'})
    }

    return Tour;

});
