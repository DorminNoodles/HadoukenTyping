import Network from './network';


class Score {

	constructor() {

		this.scores;

		// document.addEventListener((e) => {
		// 	this.saveScore(e);
		// })

		// Network.socket.emit('getScore');

	}

	saveScore(data) {
		console.log('SAVE SCORE');
		console.log("Hello > ", data);

		Network.socket.emit('saveScore', {
			"username" : data.username,
			"score" : data.score
		});
	}

	getScore(callback) {
		Network.socket.emit('getScore');
		Network.socket.on('getScore', (data) => {
			// console.log('ON GET SCORE', data);
			callback(data);
		})
	}
}

export default Score;
