const io = require('socket.io-client');

class Network {

	constructor() {

		this.socket = io('http://localhost:8000/');

		this.socket.on('connection', () => {
			console.log("SOCKET IO");
		});

		document.addEventListener('saveScore', (e) => {
			this.saveScore(e);
		});
	}

	saveScore(data) {
		// socket.emit('attack');
		console.log('SAVE SCORE');
		console.log("Hello > ", data);

		this.socket.emit('saveScore', {
			"username" : data.detail.username,
			"score" : data.detail.score
		});

	}
}

export default new Network();
