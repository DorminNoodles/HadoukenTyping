const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let usersID = {};

let playerRequest = [];
let matchs = [];

let players = [];
// playerRequest[userID]
// {
// 	id1: {
// 		id2: false
// 	}
// }

setInterval(() => {
	console.log(matchs);
},4000)

function checkMatch(player1, player2) {
	if (playerRequest[player1] && playerRequest[player1] == player2) {
		if (playerRequest[player2] && playerRequest[player2] == player1)
			return true;
	}
	return false;
}


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

		if (checkMatch(data, socket.id)) {
			console.log("MATCH !!!!!!");

			players[socket.id] = {
				life: 100,
				enemy: data
			}

			players[data] = {
				life: 100,
				enemy: socket.id
			}
			io.to(`${socket.id}`).emit('fightBegin');
			io.to(`${data}`).emit('fightBegin');
		}
		//if match launch game

	})

	socket.on('attack', () => {
		console.log("ATTACK !!!");
		let enemy = players[socket.id].enemy;
		players[enemy].life -= 100;
		console.log(enemy);
		io.to(`${enemy}`).emit('takeDamage', players[enemy].life);
		if (players[enemy].life <= 0) {
			io.to(`${enemy}`).emit('lose');
			io.to(`${socket.id}`).emit('win');
		}

	})

	io.emit('allPlayersId', usersID);
	socket.emit('allPlayersId', usersID);

	socket.on('disconnect', () => {
		if (usersID[socket.id]) {
			console.log("Deconnection : " + socket.id);
			delete usersID[socket.id];
		}
		if (playerRequest[socket.id])
			delete playerRequest[socket.id];
	})
});

io.on('disconnect', (socket) => {
	console.log("hello");

});


app.use(express.static(__dirname + '/../client'));



server.listen(8000);
