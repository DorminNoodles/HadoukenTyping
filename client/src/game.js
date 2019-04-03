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



		// document.addEventListener("addScore", (data) => {
		//
		// 	// console.log("CHANGE SCORE");
		// 	console.log(this.score);
		// 	// document.score
		// 	// // console.log(data.detail.score);
		// 	// // console.log("this.score :", this.score);
		// 	// // this.score += data.detail.score;
		// 	// // let total = this.scoreUI.renderText.getText();
		// 	// // total = (parseInt(total) + 100).toString();
		// 	// this.scoreUI.renderText.changeText("bordel");
		// 	this.addScore();
		// })
		// document.addEventListener("addScore", () => {
		// 	this.addScore();
		// });
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

			// let scoreManager = new Score();

			// this.scores = scoreManager.getScore();
			// console.log("LES SCORES >>>>>> ", self.scores);

			// self.endScores[88] = new GameObject('endScore');
			// self.endScores[88].setPosition(50, 50);
			// self.endScores[88].renderText = new RenderText('./gameFont3.png', '88888', 22, 46);

			// let myRank;
			//
			// if (self.alreadyRanking(self.scores, self.username)) {
			// 	for (let i = 0; i < self.scores.length; i++) {
			// 		if (self.scores[i].username === self.username) {
			// 			myRank = i;
			// 		}
			// 	}
			// }
			// else {
			// }
			// console.log("MY RANK >>>>>>  ", myRank);
			// console.log("MY RANK >>>>>>  ", myRank);


			//1 savoir si c est une nouvelle entree ou pas
			//2 utiliser le score de la db ou le nouveau score pour savoir si on est dans les 5 premiers ou pas
			//je prends + 4 au dessus et + 4 en dessous ou -4 et +4
			//si ils n existent pas je ne les prend pas dans le nouvel array

			// 4 => 1
			// 1 => 1
			// 1 => 1
			// 1 => 1
			// 1 => 1
			// 1 => 0
			// 1 => 0
			//
			//
			// 0 => 0
			// 0 => 0
			// 4 => 1
			// 1 => 1
			// 1 => 1
			// 1 => 1
			// 1 => 1

			// *
			// *
			// *
			// *
			// 5
			// *
			// *
			// *
			// *


			// lisa 800
			// kvin 500
			// yoan 450
			// yoan 420
			// mika 400


			// self.getRanking(self.scores, self.score);
			let alreadyRanking = self.alreadyRanking(self.scores, self.username);


			let myRank = self.getRanking(self.scores, self.score, self.username);
			console.log("HAHAHAHA >>>> ", myRank);

			let tmpScores = [];

			let i = myRank - 4;
			let j = 0;

			let tmpScore = self.score;

			while (i < myRank + 4) {
				if (self.scores[i]) {
					if (self.score > self.scores[i])
						tmpScores.push({'username': self.username, 'score': self.score});
					if (self.scores[i].username.toLowerCase() != self.username.toLowerCase() && self.scores[i].score > self.score) {
						console.log("##############  ", self.scores[i].username, '  ', self.username);
						tmpScores.push(self.scores[i]);
					}
				}
				i++;
			}

			console.log("nouvelle >>>   ", tmpScores);


			let posX = 500;
			let posY = 440;
			let currentRank = myRank - 2;
			if (currentRank < 0)
				currentRank = 0;



			console.log("+++++++++++++++++   ", i, "   +++", myRank);

			i = 0;
			while (i < 5) {

				if (tmpScores[i]) {
					tmpScores[i].rank = new GameObject('rank');
					tmpScores[i].rank.setPosition(posX, posY);
					tmpScores[i].rank.renderText = new RenderText('./gameFont3.png', (i + 1).toString(), 26, 46);
					tmpScores[i].name = new GameObject('nameScore');
					tmpScores[i].name.setPosition(posX + 100, posY);
					tmpScores[i].name.renderText = new RenderText('./gameFont3.png', tmpScores[i].username, 26, 46);
				}

				// self.endScores[i] = new GameObject('endScore');
				// self.endScores[i].setPosition(posX, posY);
				// self.endScores[i].renderText = new RenderText('./gameFont3.png', (i + 1).toString(), 22, 46);

				// if (self.scores[i]) {
					// if (i == myRank && !alreadyRanking) {
					// 	self.endScores[i] = new GameObject('endScore');
					// 	self.endScores[i].setPosition(posX, posY);
					// 	self.endScores[i].renderText = new RenderText('./gameFont3Yellow.png', currentRank.toString(), 26, 46);
					// 	self.endScores[i].name = new GameObject('nameScore');
					// 	self.endScores[i].name.setPosition(posX + 100, posY);
					// 	self.endScores[i].name.renderText = new RenderText('./gameFont3Yellow.png', self.username.toLowerCase(), 26, 46);
					// }
					//
					// // console.log("HERE ***************   >>>  ", i, self.scores[i].username);
					// self.endScores[currentRank] = new GameObject('endScore');
					// self.endScores[currentRank].setPosition(posX, posY);
					// self.endScores[currentRank].renderText = new RenderText('./gameFont3.png', (currentRank + 1).toString(), 26, 46);
					// self.endScores[currentRank].name = new GameObject('nameScore');
					// self.endScores[currentRank].name.setPosition(posX + 100, posY);
					// self.endScores[currentRank].name.renderText = new RenderText('./gameFont3.png', self.scores[currentRank].username.toLowerCase(), 26, 46);
					// self.endScores[i] = new GameObject('endScore');
					// self.endScores[i].setPosition(posX, posY);
					// self.endScores[i].renderText = new RenderText('./gameFont3.png', (i + 1).toString(), 22, 46);
					// self.endScores[i].name = new GameObject('nameScore');
					// self.endScores[i].name.setPosition(posX + 100, posY);
					// self.endScores[i].name.renderText = new RenderText('./gameFont3.png', self.username.toLowerCase(), 24, 46);
					posY += 55
				// }
				currentRank++;
				i++;
			}
		}, 2500);
	}

	alreadyRanking(scores, username){
		for (let i = 0; i < scores.length; i++) {
			if (scores[i].username.toLowerCase() === username.toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	getRanking(scores, score, username) {
		console.log("BORDEL >>>", scores.length);
		for (let i = 0; i < scores.length; i++) {
			console.log("BORDEL  score : ", score, "    scores[i].score : ", scores[i].score);
			if (scores[i].username.toLowerCase() == username.toLowerCase() && score < scores[i].score)
				return i + 1;
			if (scores[i].score < score)
				return i + 1;
		}
		return scores.length
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
