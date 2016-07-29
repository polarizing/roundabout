app.factory('Tour', function($http, $log) {
    var Tour = {};

    Tour.fetchAll = function() {
        return $http.get('/api/tours')
            .then(function(response) {
                return response.data;
            })
    }

    Tour.queryAll = function(params) {
        return $http.get('/api/tours?' + jQuery.param(params))
            .then(function(response) {
                return response.data;
            })
    }

    Tour.fetch = function(id) {
        return $http.get('/api/tours/' + id)
            .then(function(response) {
                return response.data;
            })
    }

    Tour.attachGuide = function(tour) {
        return $http.get('/api/users/' + tour.guideId)
            .then(function(response) {
                tour.guide = response.data;
                return tour;
            })
    }

    Tour.book = function(tour, user) {
        return $http.post('/api/bookings', {
                userId: user.id,
                guideId: tour.guideId,
                tourId: tour.id,
                price: tour.price
            })
            .then(function(response) {
                return response.data
            })
    }

    Tour.create = function(tour) {
        console.log("in factory")
        return $http.post('/api/tours', {
                title: tour.name,
                description: tour.description,
                tags: tour.tags,
                price: tour.price
            })
            .then(function(response) {
                return response.data
            })
    }

    return Tour;
});
