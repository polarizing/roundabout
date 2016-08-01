'use strict';

app.controller('HomeCtrl', function (Session) {

    console.log(Session.user)
    var self = this;
    self.query = '';

    self.location='';
    self.data=["new york city", "chicago", "san francisco"];
    self.color='#19A79A';

});
