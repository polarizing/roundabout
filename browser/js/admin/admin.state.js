app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'Admin',
        resolve: {
        	tours: function (Tour) {
        		return Tour.queryAll({options: {noFilter: true}});
        	},
        	users: function (User) {
        		return User.fetchAll();
        	}
        	// messages: function (Inbox) {

        	// }
        }
    });
});