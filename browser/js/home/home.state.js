app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
        	tours: function (Tour) {
        		return Tour.fetchAll();
        	}
        }
    });
});