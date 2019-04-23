import GameObject from './gameObject';
import Network from './network';
import Script from './script';
import Render from './render';
import RenderText from './renderText';
import letterScoreUI from './letterScoreUI';

class Score extends Script {

	constructor() {
		super();
		this.scores;
		this.combo = 0;
		this.playerScore = 0;

		this.addListener('badLetter', () => {
			this.breakCombo();
		});

		this.addListener('showLetterScore', (e) => {

			let s = "100" * this.combo;
			let score = new GameObject('score');
			score.setPosition(e.detail.x, e.detail.y);
			score.renderText = new RenderText('./gameFont1.png', s.toString(), 15, 46);
			score.addScript(new letterScoreUI());

			setTimeout(() => {
				GameObject.delete(score);
			}, 1000);
		});
	}

	saveScore(data) {
		Network.socket.emit('saveScore', {
			"username" : data.username,
			"score" : data.score
		});
	}

	breakCombo() {
		this.combo = 0;
	}

	getScore(callback) {
		Network.socket.emit('getScore');
		Network.socket.on('getScore', (data) => {
			this.scores = data;
			callback(data);
		})
	}

	getCombo() {
		return this.combo;
	}

	addCombo() {
		this.combo++;
	}

	addScore(score) {
		console.log("ScoreManager >> ", score);
		this.playerScore += (score * this.combo);
		console.log("player >> ", (score * this.combo));
		console.log("playerScore >> ", this.playerScore);


		let eventScoreUI = new CustomEvent("displayScoreUI", {
			detail : {'score' : this.playerScore}
		});
		document.dispatchEvent(eventScoreUI);

		// let event = new CustomEvent('displayScoreUI', {'detail' : {'score' : this.playerScore}};
		// document.dispatchEvent(eventScore);
	}
}

export default Score;
