app.config(function ($stateProvider) {
    $stateProvider.state('users.inbox', {
        url: '/inbox',
        templateUrl: 'js/users/inbox/users.inbox.html',
        controller: 'UserInbox',
        resolve: {
            conversations: function (Inbox, $stateParams, Session) {
                return Inbox.getConversations(Session.user.id);
            }
        }
    });
});
