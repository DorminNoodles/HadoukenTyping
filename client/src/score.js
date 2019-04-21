import Network from './network';


class Score {

	constructor() {

		this.scores;

		// document.addEventListener((e) => {
		// 	this.saveScore(e);
		// })
	}

	saveScore(data) {
		Network.socket.emit('saveScore', {
			"username" : data.username,
			"score" : data.score
		});
	}

	getScore(callback) {
		Network.socket.emit('getScore');
		Network.socket.on('getScore', (data) => {
			this.scores = data;
			callback(data);
		})
	}
}

export default Score;
