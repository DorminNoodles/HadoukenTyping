const io = require('socket.io-client');

class Network {

	constructor() {

		this.socket = io('http://localhost:8000');

		this.socket.on('connection', () => {
			console.log("SOCKET IO");
		});
	}

}

export default new Network();
