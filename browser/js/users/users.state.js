app.config(function ($stateProvider) {
    $stateProvider.state('users', {
        url: '/users',
        template: '<div ui-view><div>',
        abstract: true,
    });
});