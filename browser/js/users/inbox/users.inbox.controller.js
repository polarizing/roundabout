'use strict';

app.controller('UserInbox', function ($http, $scope, $state, Session, $kookies, $log, $timeout, socket, conversations) {
	$scope.conversations = conversations;
	$scope.userId = Session.user.id;
	$scope.guideId = null;

	// All conversation Id's (for long-polling)
	$scope.conversationIds = $scope.conversations.map( conversation => conversation.id);

	// For Chat Name Purposes
	$scope.userName = Session.user.name;
	$scope.travellerName = null;
	$scope.guideName = null;
	// Conversation Currently Selected
	$scope.conversation = null;
	// ID of Conversation Currently Selected
	$scope.conversationSelected = null;
	$scope.lines = [];
	$scope.isGuide = null;
	$scope.isTraveller = null;

	$scope.inboxFilter = "All Messages";
	$scope.inboxOptions = ['All Messages', 'As Guide', 'As Traveller'];
	$scope.conversationFilter = function (conversation) {
		if ($scope.inboxFilter === 'All Messages') {
			return true;
		}
		else if ($scope.inboxFilter === 'As Guide') {
			if ($scope.userId === conversation.guide.id) return true;
		}
		else if ($scope.inboxFilter === 'As Traveller') {
			if ($scope.userId !== conversation.guide.id) return true;
		}
	}


	$scope.changeSelected = function (conversation) {
		$scope.conversation = conversation
		$scope.conversationSelected = conversation.id;
		$scope.guideName = conversation.guide.name;
		$scope.travellerName = conversation.traveller.name;
		$scope.guideId = conversation.guide.id;

		if ($scope.userId === conversation.guide.id) {
			$scope.isGuide = true;
			$scope.isTraveller = false;
		}

		if ($scope.userId === conversation.traveller.id) {
			$scope.isTraveller = true;
			$scope.isGuide = false;
		}

		$http.get('/api/messages/chat/' + conversation.id)
                .then(res => {
                	return res.data;
                })
                .then(lines => {
                	$scope.lines = lines.map(function (line) {
                		if (line.userId == $scope.userId) {
                			line.me = true;
                		} else {
                			line.me = false;
                		}
                		return line;
                	})
				})

		socket.emit('switch:conversation', conversation.id, $scope.userId);

	}


	$scope.sendMessage = function () {
		// "not 'me' who receives the message"
	    socket.emit('send:message', {
	      content: $scope.message,
	      userId: $scope.userId,
	      me: false
	    });


	    $http.post('/api/messages/chat/', {content: $scope.message, conversationId: $scope.conversationSelected, userId: $scope.userId})
                .then(res => {
                	return res.data;
                })
                .then(line => {
                	console.log(line);
				})

	    // add the message to our model locally
	    $scope.lines.push({
	      content: $scope.message,
	      userId: $scope.userId,
	      me: true
	    });

	    // clear message box
	    $scope.message = '';
	  };

	$scope.formatChatLine = function (line) {
			if (line.me) return 'Me: ' + line.content;
			else return 'Test: ' + line.content;
	}



		 // Socket listeners
	  // ================

	  socket.on('init', function (data) {
	    $scope.name = data.name;
	    $scope.users = data.users;
	  });

	  socket.on('connect', function () {
	  	console.log('You have connected to the server!')
	  	socket.emit('adduser', $scope.userId)
	  })

	  socket.on('updatechat', function (data) {
	  	console.log(data);
	  	$scope.lines.push(data)
	  })

	  socket.on('change:name', function (data) {
	    changeName(data.oldName, data.newName);
	  });


	  socket.on('user:join', function (data) {
	    $scope.messages.push({
	      user: 'chatroom',
	      text: 'User ' + data.name + ' has joined.'
	    });
	    $scope.users.push(data.name);
	  });

	  // add a message to the conversation when a user disconnects or leaves the room
	  socket.on('user:left', function (data) {
	    $scope.messages.push({
	      user: 'chatroom',
	      text: 'User ' + data.name + ' has left.'
	    });
	    var i, user;
	    for (i = 0; i < $scope.users.length; i++) {
	      user = $scope.users[i];
	      if (user === data.name) {
	        $scope.users.splice(i, 1);
	        break;
	      }
	    }
	  });

	  // Private helpers
	  // ===============

	  var changeName = function (oldName, newName) {
	    // rename user in list of users
	    var i;
	    for (i = 0; i < $scope.users.length; i++) {
	      if ($scope.users[i] === oldName) {
	        $scope.users[i] = newName;
	      }
	    }

	    $scope.messages.push({
	      user: 'chatroom',
	      text: 'User ' + oldName + ' is now known as ' + newName + '.'
	    });
	  }

	  // Methods published to the scope
	  // ==============================

	  $scope.changeName = function () {
	    socket.emit('change:name', {
	      name: $scope.newName
	    }, function (result) {
	      if (!result) {
	        alert('There was an error changing your name');
	      } else {

	        changeName($scope.name, $scope.newName);

	        $scope.name = $scope.newName;
	        $scope.newName = '';
	      }
	    });
	  };



});
