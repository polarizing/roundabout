app.config(function ($stateProvider) {
    $stateProvider.state('tours', {
        url: '/tours/list?query&location',
        templateUrl: 'js/tour/list/tour.list.html',
        controller: 'TourList as ctrl',
        resolve: {
        	tours: function (Tour, $stateParams) {
                console.log('here0');
                console.log($stateParams);
                function checkProperties(obj) {
                    for (var key in obj) {
                        if (obj[key] == undefined || obj[key] == "") {
                            console.log(key, obj[key])
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