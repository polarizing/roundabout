'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

	var conversations = [];
	var connectedUsers = [];
    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
    	console.log('a user connected');
        // Now have access to socket, wowzers!

        socket.on('adduser', function (id) {
        	// add user id to connected users
        	connectedUsers.push(id);
        	// socket.room = 'room1';
        	// socket.join('room1');
        	// socket.emit('updatechat', {content: 'You can now send messages.', userId: 'SERVER' });
        	// socket.broadcast.to('room1').emit('updatechat', {content: 'Someone has connected.', userId: 'SERVER' });
        })

        socket.on('switch:conversation', function (conversationId, userId) {
        	console.log(conversationId);
        	console.log('switched');
        	(conversations.includes(conversationId)) ? console.log('exists') : conversations.push(conversationId);
        	socket.userId = userId
        	socket.room = conversationId;
        	socket.join(conversationId);
		})

		  // broadcast a user's message to other users
		  socket.on('send:message', function (data) {
		  	socket.broadcast.to(socket.room).emit('updatechat', data);
            
		  });

        socket.on('disconnect', function () {
        	console.log('a user disconnected');
        })
    });


    
    return io;

};
