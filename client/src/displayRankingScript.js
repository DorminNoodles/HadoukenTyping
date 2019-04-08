import GameObject from './gameObject';
import Script from './script';
import Score from './score';

class DisplayRankingScript extends Script {

	constructor(username) {
		super();
		console.log("HELLLOOOOOOO###########");
		let score = new Score();
		score.getScore((scores) => {
			console.log("hello >>>>>>>> ", scores);
			setTimeout(() => {

				console.log("HELLLOOOOOOO###########");
				console.log("scores 2 >>", scores);


				let tmpScores = [];
				let rank = this.getRanking(scores, username);
				tmpScores.push({
					'rank': rank + 1,
					'username': username,
					'score': scores[rank].score
				});

				tmpScores = [
					...tmpScores,
					...this.selectScores(scores, rank)
				];
				// this.tmpScores = [];

				// this.tmpScores

				console.log(tmpScores);

				console.log("rank : ", rank);


			}, 2200);
		});

	}

	update() {

	}

	selectScores(scores, rank) {
		let i = 0;
		let tmpScores = [];

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
