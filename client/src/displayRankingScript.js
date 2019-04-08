import GameObject from './gameObject';
import RenderText from './renderText';
import Script from './script';
import Score from './score';

class DisplayRankingScript extends Script {

	constructor(username) {
		super();
		this.objects = [];
		// console.log("HEY HEY >>> ", this.object);
		console.log("HELLLOOOOOOO###########");
		let score = new Score();
		score.getScore((scores) => {
			console.log("hello >>>>>>>> ", scores);
			setTimeout(() => {

				console.log("HEY HEY set timeout>>> ", this.object);
				let tmpScores = [];
				let rank = this.getRanking(scores, username);
				tmpScores = this.fillScores(scores, rank, username);

				tmpScores.sort(function(a, b) {
					return a.rank - b.rank;
				});
				this.displayScoresLines(tmpScores, username);

				console.log("Childs >>>> ", this.object.childs)

				// console.log(tmpScores);
				// console.log("rank : ", rank);

			}, 2200);
		});
	}

	update() {
		// console.log("HEY HEY >>> ", this.object);

	}

	displayScoresLines(tmpScores, username) {
		let obj = this.object;
		let posY = 450;
		let i = 0;

		while (i < tmpScores.length) {
			if (tmpScores[i]) {
				let font = (tmpScores[i].username == username) ? "./gameFont3Yellow.png" : "./gameFont3.png";

				let scoreUIRank = new GameObject('scoreUIRank');
				scoreUIRank.setPosition(460, posY);
				scoreUIRank.renderText = new RenderText(font, tmpScores[i].rank.toString(), 22, 46);
				obj.addChild(scoreUIRank);


				let scoreUIName = new GameObject('scoreUIName');
				scoreUIName.setPosition(550, posY);
				scoreUIName.renderText = new RenderText(font, tmpScores[i].username, 26, 46);
				obj.addChild(scoreUIName);
				// this.addChild(scoreUIRank);

				let scoreUI = new GameObject('scoreUI');
				scoreUI.setPosition(920, posY);
				scoreUI.renderText = new RenderText(font, tmpScores[i].score.toString(), 22, 46);
				obj.addChild(scoreUI);
				// this.addChild(scoreUIRank);
				// this.addChild(scoreUIRank);
			}
			posY += 50;
			i++;
		}
	}

	fillScores(scores, rank, username) {
		let tmpScores = [];
		let i = 1;

		tmpScores.push({
			'rank': rank + 1,
			'username': username,
			'score': scores[rank].score
		});

		while (i < 5 && tmpScores.length < 5) {
			if (scores[rank + i])
				tmpScores.push({"rank": rank + i + 1, 'username': scores[rank + i].username, 'score': scores[rank + i].score});
			if (scores[rank - i])
				tmpScores.push({"rank": rank - i + 1, 'username': scores[rank - i].username, 'score': scores[rank - i].score});
			i++;
		}
		return tmpScores;
	}

	getRanking(scores, username) {
		for (let i = 0; i < scores.length; i++) {
			if (scores[i].username.toLowerCase() == username.toLowerCase())
				return i;
		}
	}
}

export default DisplayRankingScript;
