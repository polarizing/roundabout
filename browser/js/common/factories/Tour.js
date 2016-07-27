app.factory('Tour', function ($http) {
    var Tour = {};

    Tour.fetchAll = function () {
        return $http.get('/api/tours')
                    .then(function (response) {
                        return response.data;
                    })
                    .then(function (tours) {
                        var promises = [];
                        for (var i = 0; i < tours.length; i++) {
                            promises.push( Tour.attachGuide(tours[i]) )
                        }
                        return Promise.all(promises)
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

    return Tour;

});
