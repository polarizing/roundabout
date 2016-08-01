'use strict';

app.controller('UserInbox', function ($http, $scope, $state, Session, $kookies, $log, $timeout, socket, conversations) {
	
	// REALLY BASIC MOD 

	// All Conversations For User Loaded From DB / RESOLVE
	$scope.conversations = conversations;

	// CURRENT USER ID FROM SESSION STORE
	$scope.userId = Session.user.id;
	$scope.guideId = null;

	// For CHAT NAME / LOGIC Purposes (Am I a guide talking to traveller or vice-versa?)
	$scope.userName = Session.user.name;
	$scope.travellerName = null;
	$scope.guideName = null;
	$scope.isGuide = null;
	$scope.isTraveller = null;

	// Conversation DB Obj Currently Selected
	$scope.conversation = null;

	// ID of Conversation Currently Selected
	$scope.conversationSelected = null;

	// All LINES OF CONVERSATION STORED
	$scope.lines = [];

	// FILTER BY -- SELECT OPTIONS
	$scope.inboxFilter = "All Messages";
	$scope.inboxOptions = ['All Messages', 'As Guide', 'As Traveller'];


	// MAIN METHODS
	// CONVERSATION FILTER FILTERS BY GUIDE OR TRAVELLER

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

	// CHANGESELECTED CHANGES TO SELECTED CONVERSATION
	$scope.changeSelected = function (conversation) {

		// SET CONVERSATION AND ALL OTHER NULL CONSTANTS
		// IDENTIFY WHO IS GUIDE AND WHO IS TRAVELLER

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

		// GET CHAT LOG FOR CONVERSATION
		// IDENTIFY WHICH LINE IS "MINE"

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

		// EMIT EVENT THAT CONVERSATION HAS BEEN SWITCHED (ON SERVER IO.JS)
		// CREATES AND BINDS A "ROOM" TO SOCKET FOR EVERY UNIQUE CONVERSATION

		socket.emit('switch:conversation', conversation.id, $scope.userId);

	}

	// SEND MESSAGE SENDS A MESSAGE TO ROOM HOLDING THE CONVERSATION
	$scope.sendMessage = function () {
		
		// "not 'me' who receives the message"
	    socket.emit('send:message', {
	      content: $scope.message,
	      userId: $scope.userId,
	      me: false
	    });

	    // PERSIST CHAT TO DATABASE

	    $http.post('/api/messages/chat/', {content: $scope.message, conversationId: $scope.conversationSelected, userId: $scope.userId})
                .then(res => {
                	return res.data;
                })
                .then(line => {
                	console.log(line);
				})

	    // ADD MESSAGE TO OUR MODEL LOCALLY
	    $scope.lines.push({
	      content: $scope.message,
	      userId: $scope.userId,
	      me: true
	    });

	    // CLEAR MESSAGE BOX
	    $scope.message = '';
	  };

	  // FORMATS CHAT LINE -- NOT USED BUT MOVE TEMPLATE LOGIC HERE IN THE FUTURE
		$scope.formatChatLine = function (line) {
				if (line.me) return 'Me: ' + line.content;
				else return 'Test: ' + line.content;
		}



		 // Socket listeners
	  // ================

	  // NOT REALLY USED BUT MIGHT BE USEFUL
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


	  // THESE THREE SOCKET LISTENERS BELOW ARE NOT BEING USED

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

});
