'use-strict';

app.factory('Inbox', function($http) {

  var Inbox = {};

  Inbox.getConversations = function (id) {
    return $http.get('/api/messages/conversation/' + id)
                .then(function (res) {
                  return res.data;
                })
                .then(function (conversations) {
                  var promises = [];
                  for (var i = 0; i < conversations.length; i++) {
                    promises.push(Inbox.attachGuideTravellerTour(conversations[i]))
                  }
                  return Promise.all(promises);
                })
  }


     Inbox.attachGuideTravellerTour = function (conversation) {
         return $http.get('/api/users/' + conversation.guide)
              .then(function (response) {
                 conversation.guide = response.data;
                 return conversation;
              })
              .then(function (conversation) {
                return $http.get('/api/users/' + conversation.traveller)
              })
              .then(function (response) {
                conversation.traveller = response.data;
                return conversation;
              })
              .then(function (conversation) {
                return $http.get('/api/tours/' + conversation.tourId)
              })
              .then(function (response) {
                conversation.tour = response.data;
                return conversation;
              })
     }

  Inbox.getChatLines = function (id) {
    return $http.get('/api/messages/chat/' + id)
                .then(res => res.data);
  }

  // Order.create = function(id) {
  //   return $http.post('/api/orders', {id: id})
  //   .then(res => res.data)
  // };

  // Order.getOrder = function(id) {
  //   return $http.get('/api/orders/:id')
  //   .then(res => res.data)
  // }

  return Inbox;

})
