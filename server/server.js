const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let usersID = [];

io.on('connection', (socket) => {
	console.log("one user");
	console.log(socket.id);
	socket.on('lettersValid', () => {
		console.log("Receive msg");
	})
});

io.on('deconnection', (socket) => {

	// socket.on('lettersValid', () => {
	// 	console.log("Receive msg");
	// })
});




app.use(express.static(__dirname + '/../client'));



server.listen(8000);
