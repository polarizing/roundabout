'use strict';

app.controller('HomeCtrl', function ($state, $kookies) {

    // redirect to checkout upon OAuth login, if user has added something to cart but had not logged in
    if ($kookies.get('cart')) {
        $state.go('checkout')
    }

    var self = this;
    self.query = '';

    self.location='';
    self.data=["new york city", "chicago", "san francisco"];
    self.color='#19A79A';

});
