import Network from './network';


class Score {

	constructor() {

		// document.addEventListener((e) => {
		// 	this.saveScore(e);
		// })

		Network.socket.on('getScore', (data) => {
			console.log('ON GET SCORE', data);
		})
	}

	saveScore(data) {
		console.log('SAVE SCORE');
		console.log("Hello > ", data);

		Network.socket.emit('saveScore', {
			"username" : data.username,
			"score" : data.score
		});
	}

	getScore() {
		Network.socket.emit('getScore');
	}
}

export default Score;
