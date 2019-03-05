const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', () => {
	console.log("one user");
});




app.use(express.static(__dirname + '/../client'));



server.listen(8000);
