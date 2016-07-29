app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/booking/checkout/checkout.html',
        controller: 'Checkout',
        resolve: {
        }
    });
});