const sortJsonArray = require('sort-json-array');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let usersID = {};

let playerRequest = [];
let matchs = [];

let players = [];

let playersList = {}

let scores = [];

// scores.push({username: 'maurice', score: 240});
// scores.push({username: 'pouet', score: 500});
// scores.push({username: 'cingle', score: 400});

console.log(scores)

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

	const fs = require('fs');

	fs.stat("scores.scores", (err) => {
		if (!err) {
			let rawData = fs.readFileSync('scores.scores');
			let scoresJSON = JSON.parse(rawData);
			scores = scoresJSON;
		}
	})

	// console.log("SORT >> ", scores);
	// if (fs.stat("scores.scores", ())) {
	// 	let rawData = fs.readFileSync('scores.scores');
	// 	let scoresJSON = JSON.parse(rawData);
	// 	scores = scoresJSON;
	// }

	// See if the file exists

	let savedUsername;

	console.log("connection: " + socket.id);
	usersID[socket.id] = true;
	socket.on('lettersValid', () => {
		console.log("Receive msg");
	})

	socket.emit('getScores', scores);

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
	})

	socket.on('attack', () => {
		console.log("ATTACK !!!");
		let enemy = players[socket.id].enemy;
		players[enemy].life -= 10;
		console.log(enemy);
		io.to(`${enemy}`).emit('takeDamage', players[enemy].life);
		if (players[enemy].life <= 0) {
			io.to(`${enemy}`).emit('lose');
			io.to(`${socket.id}`).emit('win');
		}
	})

	socket.on('saveScore', (data) => {
		console.log('saveScore => ', data);
		let save = false;

		for (let i = 0; i < scores.length; i++) {
			if (scores[i].username == data.username) {
				save = true;
				if (scores[i].score < data.score) {
					scores[i].username = data.username;
					scores[i].score = data.score;
				}
			}
		}

		if (!save) {
			scores.push({
				'username': data.username,
				'score': data.score
			});
		}

		scores.sort(function(a, b) {
			return b.score - a.score;
		});

		let fs = require('fs');
		fs.writeFile("scores.scores", JSON.stringify(scores), function(err) {
			if (err) {
	        	console.log(err);
	    	}
		});
		console.log(scores);
	});

	socket.on('getScore', (data) => {
		console.log('SERVER GET SCORE', scores);

		// let test = [5,25,47,14];
		io.emit('getScore', scores);
	});

	io.emit('allPlayersId', playersList);

	socket.on('disconnect', () => {
		if (usersID[socket.id]) {
			console.log("Deconnection : " + socket.id);
			delete usersID[socket.id];
		}
		if (playerRequest[socket.id])
			delete playerRequest[socket.id];
		if (playersList[savedUsername]) {
			delete playersList[savedUsername];
			io.emit('allPlayersId', playersList);
		}
	})

	socket.on('saveUsername', (username) => {
		playersList[username] = socket.id;
		savedUsername = username;
		console.log(username);
		console.log(playersList);
		io.emit('allPlayersId', playersList);
	})
});

io.on('disconnect', (socket) => {
	console.log("hello");
});


app.use(express.static(__dirname + '/../client'));



server.listen(8000);


// function sortScore() {
//
// 	for(let i = 0; i < scores.length; i++) {
// 		if(scores[i] > scores[i + 1]) {
// 			scores
// 		}
// 	}
// }
