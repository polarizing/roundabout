app.config(function ($stateProvider) {
    $stateProvider.state('tours', {
        url: '/tours?query&location',
        templateUrl: 'js/tour/list/tour.list.html',
        controller: 'TourList as ctrl',
        resolve: {
        	tours: function (Tour, $stateParams) {
                function checkProperties(obj) {
                    for (var key in obj) {
                        if (obj[key] == undefined || obj[key] == "") {
                            return false;
                        }
                    }
                    return true;
                }
                if (!checkProperties($stateParams)) {
                    return Tour.fetchAll();
                }
                else {
                    return Tour.queryAll($stateParams);
                }
        	}
        },

    });
});