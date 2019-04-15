const io = require('socket.io-client');

class Network {

	constructor() {

		this.socket = io('http://51.83.44.50:8000');

		this.socket.on('connection', () => {
			console.log("SOCKET IO");
		});

		// document.addEventListener('saveScore', (e) => {
		// 	this.saveScore(e);
		// });
	}

}

export default new Network();
