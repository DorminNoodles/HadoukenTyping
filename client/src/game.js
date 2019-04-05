// import ryuAnim from './ryuAnim.js';

// import * as pender from './render';
// let SpawnerScript = require('./spawnerScript.js');
import SpawnerScript from './spawnerScript';
import RenderManager from './renderManager';
import ControllerScript from './controller';
import SoloFinish from './soloFinish';
import GameObject from './gameObject';
import RenderText from './renderText';
import Render from './render';
import Score from './score';
import Core from './core';


class Game {

	constructor(type, username){
		this.username = username;
		this.testo = 'hello';
		this.canvasBack;
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext("2d");
		this.renderManager = new RenderManager();
		this.currentState = "inGame";
		this.score = 0;
		this.combo = 0;
		this.scores;
		this.endScores = [];
		this.states = {
			"inGame" : {
				"init" : this.initSolo,
				"end" : this.endSolo
			},
			"endGame" : {
				"init" : this.initFinishScreen,
				"end" : this.endFinishScreen
			}
		};

		this.scoreManager = new Score();
		this.scores;
		this.scoreManager.getScore((scores) => {
			console.log("Hello  fuk fuk ", scores);
			this.scores = scores;
		})


		// this.scores = this.scoreManager.getScore();

		// console.log("THIS > SCORE", this.scores);

		this.canvasBackground();

		this.states[this.currentState].init(this);

		setTimeout(() => {
			this.gameLoop();
		},25)

		document.addEventListener("finish", () => {
			// GameObject.delete(this.spawner);
			this.changeState("endGame");
			console.log("FINISH +++++++++++++++++");
			// let eventSaveScore = new CustomEvent("saveScore", { detail: {
			// 	'score': this.score,
			// 	'username': this.username
			// }});
			// document.dispatchEvent(eventSaveScore);
			this.scoreManager.saveScore({
				"score": this.score,
				"username": this.username
			});

			let score = new Score();
			score.getScore((data) => {
				// console.log("TA MERE DATA >", data);
				this.displayRanking(this, data);
			});
		})

		document.addEventListener("addScore", (e) => {
			this.addScore(e.detail.score);
		});

		document.addEventListener('combo', () => {
			this.combo++;
			this.comboUI.renderText.changeText('x' + this.combo.toString());
		})

		document.addEventListener('badLetter', () => {
			this.combo = 0;
			this.comboUI.renderText.changeText('x' + this.combo.toString());
		})
	}

	bordel() {
		console.log("hello++++++> ", this.putain);
	}

	canvasBackground() {
		this.canvasBack = document.getElementById('canvasBack');
		let ctx = this.canvasBack.getContext("2d");

		let img = new Image();   // Crée un nouvel élément Image
		img.src = './backgroundGame.gif';
		img.onload = () => {
			var pattern = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
			ctx.fillStyle = pattern;
			ctx.fillRect(0, 0, this.canvasBack.width, this.canvasBack.height); // context.fillRect(x, y, width, height);
		}
	}

	// initVersus() {
	// 	let inputController = new GameObject('inputController');
	// 	this.boardBar = new GameObject('boardBar');
	// 	this.spawner = new GameObject('spawner');
	//
	// 	this.spawner.setPosition(1330, 250);
	// 	this.boardBar.setPosition(50, 454);
	//
	//
	// 	this.spawner.render = new Render('./spawner.gif');
	// 	this.boardBar.render = new Render('./gameBoardBar.gif');
	// 	this.spawner.script = new SpawnerScript();
	// 	inputController.script = new ControllerScript(this.spawner);
	//
	// 	this.scoreUI = new GameObject('scoreUI');
	// 	this.scoreUIBackground = new GameObject('scoreUIBackground');
	// 	this.scoreUIBackground.render = new Render('./backgroundScore.png');
	// 	this.scoreUIBackground.setPosition(600, 10);
	// 	this.scoreUI.renderText = new RenderText('./gameFont1.png', '00000', 15);
	// 	this.scoreUI.setPosition(600, 30);
	//
	// 	document.addEventListener("addScore", (score) => {
	// 		let total = this.scoreUI.renderText.getText();
	// 		total = (parseInt(total) + 100).toString();
	// 		this.scoreUI.renderText.changeText(total);
	// 	})
	// }

	initSolo(self) {
		// console.log("first this score : ", this.score)
		console.log("THIS >>>", this);
		// console.log("first this score : ", this.score)
		let inputController = new GameObject('inputController');
		self.boardBar = new GameObject('boardBar');
		self.spawner = new GameObject('spawner');
		// console.log("id >>>>>>>>>>>> ", +self.spawner.id);

		self.spawner.setPosition(1330, 250);
		self.boardBar.setPosition(50, 454);


		self.spawner.render = new Render('./spawner.gif');
		self.boardBar.render = new Render('./gameBoardBar.gif');
		self.spawner.script = new SpawnerScript();
		inputController.script = new ControllerScript(self.spawner);

		self.scoreUI = new GameObject('scoreUI');
		self.scoreUIBackground = new GameObject('scoreUIBackground');
		self.scoreUIBackground.render = new Render('./backgroundScore.png');
		self.scoreUIBackground.setPosition(650, 10);
		self.scoreUI.renderText = new RenderText('./gameFont1.png', '00000', 15, 46);
		self.scoreUI.setPosition(650, 30);

		self.comboUI = new GameObject('comboUI');
		self.comboUI.setPosition(400, 10);
		self.comboUI.renderText = new RenderText('./gameFont4.png', '', 32, 92);
	}

	addScore(score) {
		// console.log("ADD SCORE : " + score);
		// console.log("ADD SCORE : " + this.score);
		this.score += score;
		// console.log(this.scoreUI);

		let zeros = this.stringZeros(this.score.toString(), 12);

		this.scoreUI.renderText.changeText(zeros + this.score.toString());
	}

	endSolo(self) {
		console.log("THIS ", self);
		GameObject.delete(self.spawner);
		GameObject.delete(self.boardBar);
		GameObject.delete(self.scoreUIBackground);
		GameObject.delete(self.scoreUI);
		GameObject.delete(self.comboUI);
		console.log("END GAME **********");

		self.finishScorePanel = new GameObject('finishScorePanel');
		self.finishScorePanel.setPosition(420, -1800);
		self.finishScorePanel.render = new Render('./finishScore.png');
		self.finishScorePanel.addScript(new SoloFinish());

		self.scoreText = new GameObject('scoreText');
		self.scoreText.setPosition(650, 350);
		setTimeout(() => {
			let stringZero;
			let delta = Math.floor(self.score / 350);
			let score = 0;

			let inter = setInterval(() => {
				console.log(score.toString().length);

				stringZero = self.stringZeros(score.toString(), 12);
				self.scoreText.renderText = new RenderText('./gameFont3.png', stringZero + score.toString(), 22, 46);
				score += delta;
				if (score > self.score) {
					score = self.score;
					self.scoreText.renderText = new RenderText('./gameFont3.png', stringZero + score.toString(), 22, 46);
					clearInterval(inter);
				}
			}, 20);
		}, 2500);
	}

	displayRanking(self, scores) {

		// console.log(data);
		// console.log("PUTAIN !!!!!!!! ############# >>> ", data);

		console.log("########### >>>", self.username);

		let rank = self.getRanking(scores, self.username);


		let tmpScores = [];
		let i = 1;

		tmpScores.push({"rank": rank + 1, 'username': self.username, 'score': scores[rank].score});

		while (i < 5 && tmpScores.length < 5) {
			if (scores[rank + i])
				tmpScores.push({"rank": rank + i + 1, 'username': scores[rank + i].username, 'score': scores[rank + i].score});
			if (scores[rank - i])
				tmpScores.push({"rank": rank - i + 1, 'username': scores[rank - i].username, 'score': scores[rank - i].score});
			i++;
		}
		// tmpScores.push({"putain": 43, "merde": 245});
		console.log("TMPSCORES >>>>>>>>>>>> ", tmpScores);

		tmpScores.sort(function(a, b) {
			return b.rank - a.rank;
		});
		console.log("TMPSCORES >>>>>>>>>>>> ", tmpScores);
	}

	alreadyRanking(scores, username) {
		for (let i = 0; i < scores.length; i++) {
			if (scores[i].username.toLowerCase() === username.toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	getRanking(scores, username) {
		for (let i = 0; i < scores.length; i++) {
			if (scores[i].username.toLowerCase() == username.toLowerCase())
				return i;
		}
	}

	stringZeros(string, length) {
		let stringZeros = '';
		let nbZero = length - string.length;

		for (let i = 0; i < nbZero; i++)
			stringZeros += '0';

		return stringZeros;
	}

	gameLoop() {
		console.log("gamelooop");
		console.log("fuck you animationFrame");

		console.log("here bordel", this.testo);

		let loop = (e) => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.renderBackground();
			this.renderManager.update();
			Core.update();
			requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);
	}

	changeState(state) {
		console.log("this.states : ", this.currentState);
		this.states[this.currentState].end(this);
		this.currentState = state;
		this.states[this.currentState].init(this);
	}

	renderBackground() {
		canvas.width = 1600;
		canvas.height = 1400;
		this.ctx.drawImage(this.canvasBack, 0, 0);
	}

	initFinishScreen() {
		// let scorePanel = new GameObject('scorePanel');
		// scorePanel.render = new Render('./flashAnim.png');
	}

	endFinishScreen() {

	}
}


export default Game;
