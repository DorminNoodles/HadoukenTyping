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

}

export default new Network();
