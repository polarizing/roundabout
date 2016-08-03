app.config(function ($stateProvider) {
    $stateProvider.state('users.inbox', {
        url: '/inbox',
        templateUrl: 'js/users/inbox/users.inbox.html',
        controller: 'UserInbox',
        resolve: {
            conversations: function (Inbox, $stateParams, Session, AuthService) {
                // console.log('hi');
                // console.log('this is session',Session);
                // console.dir(Session.user)

                return AuthService.getLoggedInUser()
                           .then(user => {
                            return Inbox.getConversations(Session.user.id);
                           })
                    // return Inbox.getConversations(Session.user.id);
                // }
                // return Inbox.getConversations(Session.user.id);
            }
        }
    });
});
