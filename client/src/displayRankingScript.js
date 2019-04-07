import GameObject from './gameObject';
import Script from './script';
import Score from './score';

class DisplayRankingScript extends Script {

	constructor() {
		super();
		console.log("HELLLOOOOOOO###########");
		let score = new Score();
		score.getScore((data) => {
			setTimeout(() => {

				console.log("HELLLOOOOOOO###########");
				console.log(data);
				this.rankingDisplay = new GameObject('rankingDisplay');
				this.rankingDisplay.addScript(new DisplayRankingScript());

				// this.rank = self.getRanking(scores, self.username);
				// this.tmpScores = [];

			}, 2200);
		});

	}

	update() {

	}

	getRanking(scores, username) {
		for (let i = 0; i < scores.length; i++) {
			if (scores[i].username.toLowerCase() == username.toLowerCase())
				return i;
		}
	}
}

export default DisplayRankingScript;
