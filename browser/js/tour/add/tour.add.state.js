app.config(function ($stateProvider) {
    $stateProvider.state('addtour', {
        url: '/tours/create',
        templateUrl: 'js/tour/add/tour.add.html',
        controller: 'TourAdd'
    });
});
