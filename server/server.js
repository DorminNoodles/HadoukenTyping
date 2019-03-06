const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let usersID = {};

let playerRequest = [];

// playerRequest[userID]
// {
// 	id1: {
// 		id2: false
// 	}
// }

io.on('connection', (socket) => {
	console.log("connection: " + socket.id);
	usersID[socket.id] = true;
	socket.on('lettersValid', () => {
		console.log("Receive msg");
	})

	socket.on('playerRequest', (data) => {
		console.log(data);
		playerRequest[socket.id] = data;
		console.log("###playerRequest###");
		console.log(playerRequest);

		//if match launch game

	})

	io.emit('allPlayersId', usersID);
	socket.emit('allPlayersId', usersID);

	socket.on('disconnect', () => {
		if (usersID[socket.id]) {
			console.log("Deconnection : " + socket.id);
			delete usersID[socket.id];
		}
	})
});

io.on('disconnect', (socket) => {
	console.log("hello");

});


app.use(express.static(__dirname + '/../client'));



server.listen(8000);
