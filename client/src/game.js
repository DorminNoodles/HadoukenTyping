import DisplayRankingScript from './displayRankingScript';
import SoloFinishAnim from './soloFinishAnim';
import SpawnerScript from './spawnerScript';
import RenderManager from './renderManager';
import ControllerScript from './controller';
import EndMenuScript from './endMenuScript';
import GameObject from './gameObject';
import RenderText from './renderText';
import Render from './render';
import Script from './script';
import Score from './score';
import Core from './core';
import scoreUI from './gameObjects/scoreUI/scoreUI';
import blackDeathUI from './gameObjects/blackDeathUI/blackDeathUI';
import numberKeysUI from './gameObjects/numberKeysUI/numberKeysUI';
import cursorUI from './gameObjects/cursorUI/cursorUI';
import speedProfiler from './gameObjects/speedProfiler/speedProfiler';
import endGameMenu from './gameObjects/endGameMenu/endGameMenu';


class Game extends Script {

	constructor(username) {
		super();

		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');

		this.renderManager = new RenderManager();
		this.scoreManager = new Score();
		this.username = username;
		this.score = 0;

		this.initSolo();

		setTimeout(() => {
			this.gameLoop();
		}, 25);

		this.addListener('finishGame', () => {
			this.endSolo();
		});

		this.addListener('addScore', (e) => {
			this.addScore(e.detail.score);
		});

		this.addListener('combo', () => {
			// this.addCombo();
			this.scoreManager.addCombo();
		})
	}

	gameLoop() {
		let loop = (e) => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.renderManager.update();
			Core.update();
			this.reqAnimGameLoop = requestAnimationFrame(loop);
		}
		this.reqAnimGameLoop = requestAnimationFrame(loop);
	}

	initSolo() {
		this.controller = this.newObject(new GameObject('controller'));
		this.boardBar = this.newObject(new GameObject('boardBar'));
		this.spawner = this.newObject(new GameObject('spawner'));

		this.boardBar.setPosition(50, 454);
		this.spawner.setPosition(1330, 250);

		this.boardBar.render = new Render('./gameBoardBar.gif');
		this.spawner.render = new Render('./spawner.gif');

		this.spawner.script = new SpawnerScript();
		this.controller.script = new ControllerScript(this.spawner);

		this.scoreUI = scoreUI();

		this.blackDeathUI = this.newObject(blackDeathUI());
		this.numberKeysUI = this.newObject(numberKeysUI());
		this.speedProfiler = this.newObject(speedProfiler());
		// speedProfiler();


		// this.numberKeysUI = this.newObject(numberKeysUI());
		// console.log()
		// this.scoreUI = this.newObject(new GameObject('scoreUI'));
		// self.scoreUIBackground = new GameObject('scoreUIBackground');
		// self.scoreUIBackground.render = new Render('./backgroundScore.png');
		// self.scoreUIBackground.setPosition(650, 10);

		// this.scoreUI.setPosition(650, 30);
		// this.scoreUI.renderText = new RenderText('./gameFont1.png', '00000', 15, 46);
		//
		// self.comboUI = new GameObject('comboUI');
		// self.comboUI.setPosition(400, 10);
		// self.comboUI.renderText = new RenderText('./gameFont4.png', '', 32, 92);
	}

	endSolo() {
		this.scoreManager.saveScore({
			"score": this.scoreManager.playerScore,
			"username": this.username
		});

		GameObject.delete(this.spawner);
		GameObject.delete(this.boardBar);
		GameObject.delete(this.scoreUI);
		GameObject.delete(this.numberKeysUI);
		// GameObject.delete(self.scoreUIBackground);
		// GameObject.delete(self.comboUI);


		this.finishScorePanel = this.newObject(new GameObject('finishScorePanel'));
		this.finishScorePanel.setPosition(420, -5000);
		this.finishScorePanel.render = new Render('./finishScore.png');
		this.finishScorePanel.addScript(new SoloFinishAnim());

		setTimeout(() => {
			this.endGameMenu = this.newObject(endGameMenu());
		}, 600);

		// self.scoreText = new GameObject('scoreText');
		// self.scoreText.setPosition(650, 300);
		// setTimeout(() => {
		// 	let stringZero;
		// 	let delta = Math.floor(self.score / 120);
		// 	let score = 0;
		//
		// 	let inter = setInterval(() => {
		// 		stringZero = self.stringZeros(score.toString(), 12);
		// 		self.scoreText.renderText = new RenderText('./gameFont3.png', stringZero + score.toString(), 22, 46);
		// 		score += delta;
		// 		if (score > self.score) {
		// 			score = self.score;
		// 			self.scoreText.renderText = new RenderText('./gameFont3.png', stringZero + score.toString(), 22, 46);
		// 			clearInterval(inter);
		// 		}
		// 	}, 20);
		//
		// 	self.endMenu = new GameObject('endMenu');
		// 	self.endMenu.addScript(new EndMenuScript(self.username));
		//
		// }, 2500);

	}

	addScore(score) {
		this.scoreManager.addScore(score);

		// let zeros = this.stringZeros(this.score.toString(), 12);

		// this.scoreUI.renderText.changeText(zeros + this.score.toString());
	}

	// canvasBackground() {
	// 	console.log("BACKGROUND");
	//
	// 	this.canvasBack = document.getElementById('canvasBack');
	// 	let ctx = this.canvasBack.getContext("2d");
	//
	// 	let img = new Image();   // Crée un nouvel élément Image
	// 	img.src = './backgroundGame.gif';
	// 	img.onload = () => {
	// 		var pattern = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
	// 		ctx.fillStyle = pattern;
	// 		ctx.fillRect(0, 0, this.canvasBack.width, this.canvasBack.height); // context.fillRect(x, y, width, height);
	// 	}
	// }

}


// class Game {
//
// 	constructor(type, username){
//
// 		console.log(GameObject.listOfAll());
//
// 		this.username = username;
// 		this.canvasBack;
// 		this.canvas = document.getElementById('canvas');
// 		this.ctx = canvas.getContext("2d");
// 		canvas.width = 1600;
// 		canvas.height = 1400;
// 		this.renderManager = new RenderManager();
// 		this.currentState = "inGame";
// 		this.score = 0;
// 		this.combo = 0;
// 		this.scores;
// 		this.endScores = [];
// 		// this.states = {
// 		// 	"inGame" : {
// 		// 		"init" : this.initSolo,
// 		// 		"end" : this.endSolo
// 		// 	},
// 		// 	"endGame" : {
// 		// 		"init" : this.initFinishScreen,
// 		// 		"end" : this.endFinishScreen
// 		// 	}
// 		// };
//
// 		this.scoreManager = new Score();
// 		this.scores;
// 		this.canvasBackground();
//
// 		// this.states[this.currentState].init(this);
//
// 		this.initSolo(this);
//
// 		setTimeout(() => {
// 			this.gameLoop();
// 		},25)
//
// 		this._finish = () => {
// 			this.finish(this);
// 		};
//
// 		document.addEventListener("finishGame", this._finish);
//
// 		this._addScore = (e) => {
// 			this.addScore(e.detail.score);
// 		};
//
// 		document.addEventListener("addScore", this._addScore);
//
// 		document.addEventListener('combo', () => {
// 			this.combo++;
// 			this.comboUI.renderText.changeText('x' + this.combo.toString());
// 		});
//
// 		document.addEventListener('badLetter', () => {
// 			this.combo = 0;
// 			this.comboUI.renderText.changeText('x' + this.combo.toString());
// 		});
//
// 	}
//
// 	finish(self) {
// 		this.endSolo(self);
// 		// self.changeState("endGame");
// 		// self.scoreManager.saveScore({
// 		// 	"score": self.score,
// 		// 	"username": self.username
// 		// });
//
//
// 		// self.rankingDisplay = new GameObject('rankingDisplay');
// 		// self.rankingDisplay.addScript(new DisplayRankingScript(self.username));
// 	}
//
// 	canvasBackground() {
// 		this.canvasBack = document.getElementById('canvasBack');
// 		let ctx = this.canvasBack.getContext("2d");
//
// 		let img = new Image();   // Crée un nouvel élément Image
// 		img.src = './backgroundGame.gif';
// 		img.onload = () => {
// 			var pattern = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
// 			ctx.fillStyle = pattern;
// 			ctx.fillRect(0, 0, this.canvasBack.width, this.canvasBack.height); // context.fillRect(x, y, width, height);
// 		}
// 	}
//
// 	initSolo(self) {
// 		self.controller = new GameObject('controller');
// 		self.boardBar = new GameObject('boardBar');
// 		self.spawner = new GameObject('spawner');
//
// 		self.spawner.setPosition(1330, 250);
// 		self.boardBar.setPosition(50, 454);
//
//
// 		self.spawner.render = new Render('./spawner.gif');
// 		self.boardBar.render = new Render('./gameBoardBar.gif');
// 		self.spawner.script = new SpawnerScript();
// 		self.controller.script = new ControllerScript(self.spawner);
//
// 		self.scoreUI = new GameObject('scoreUI');
// 		self.scoreUIBackground = new GameObject('scoreUIBackground');
// 		self.scoreUIBackground.render = new Render('./backgroundScore.png');
// 		self.scoreUIBackground.setPosition(650, 10);
// 		self.scoreUI.renderText = new RenderText('./gameFont1.png', '00000', 15, 46);
// 		self.scoreUI.setPosition(650, 30);
//
// 		self.comboUI = new GameObject('comboUI');
// 		self.comboUI.setPosition(400, 10);
// 		self.comboUI.renderText = new RenderText('./gameFont4.png', '', 32, 92);
// 	}
//
// 	addScore(score) {
// 		this.score += score;
//
// 		let zeros = this.stringZeros(this.score.toString(), 12);
//
// 		this.scoreUI.renderText.changeText(zeros + this.score.toString());
// 	}
//
// 	endSolo(self) {
// 		self.scoreManager.saveScore({
// 			"score": self.score,
// 			"username": self.username
// 		});
//
// 		GameObject.delete(self.spawner);
// 		GameObject.delete(self.boardBar);
// 		GameObject.delete(self.scoreUIBackground);
// 		GameObject.delete(self.scoreUI);
// 		GameObject.delete(self.comboUI);
//
//
// 		self.finishScorePanel = new GameObject('finishScorePanel');
// 		self.finishScorePanel.setPosition(420, -1800);
// 		self.finishScorePanel.render = new Render('./finishScore.png');
// 		self.finishScorePanel.addScript(new SoloFinishAnim());
//
// 		self.scoreText = new GameObject('scoreText');
// 		self.scoreText.setPosition(650, 300);
// 		setTimeout(() => {
// 			let stringZero;
// 			let delta = Math.floor(self.score / 120);
// 			let score = 0;
//
// 			let inter = setInterval(() => {
// 				stringZero = self.stringZeros(score.toString(), 12);
// 				self.scoreText.renderText = new RenderText('./gameFont3.png', stringZero + score.toString(), 22, 46);
// 				score += delta;
// 				if (score > self.score) {
// 					score = self.score;
// 					self.scoreText.renderText = new RenderText('./gameFont3.png', stringZero + score.toString(), 22, 46);
// 					clearInterval(inter);
// 				}
// 			}, 20);
//
// 			self.endMenu = new GameObject('endMenu');
// 			self.endMenu.addScript(new EndMenuScript(self.username));
//
// 		}, 2500);
//
// 	}
//
// 	alreadyRanking(scores, username) {
// 		for (let i = 0; i < scores.length; i++) {
// 			if (scores[i].username.toLowerCase() === username.toLowerCase()) {
// 				return true;
// 			}
// 		}
// 		return false;
// 	}
//
// 	getRanking(scores, username) {
// 		for (let i = 0; i < scores.length; i++) {
// 			if (scores[i].username.toLowerCase() == username.toLowerCase())
// 				return i;
// 		}
// 	}
//
// 	stringZeros(string, length) {
// 		let stringZeros = '';
// 		let nbZero = length - string.length;
//
// 		for (let i = 0; i < nbZero; i++)
// 			stringZeros += '0';
//
// 		return stringZeros;
// 	}
//
// 	gameLoop() {
// 		let loop = (e) => {
// 			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
// 			this.renderManager.update();
// 			Core.update();
// 			this.reqAnimGameLoop = requestAnimationFrame(loop);
// 		}
// 		this.reqAnimGameLoop = requestAnimationFrame(loop);
// 	}
//
// 	changeState(state) {
// 		this.states[this.currentState].end(this);
// 		this.currentState = state;
// 		this.states[this.currentState].init(this);
// 	}
//
// 	renderBackground() {
// 		canvas.width = 1600;
// 		canvas.height = 1400;
// 		this.ctx.drawImage(this.canvasBack, 0, 0);
// 	}
//
// 	deleteGame() {
// 		console.log("DELETE GAME");
// 		if (this.finishScorePanel)
// 			GameObject.delete(this.finishScorePanel);
// 		if (this.scoreText)
// 			GameObject.delete(this.scoreText);
// 		if (this.endMenu) {
// 			GameObject.delete(this.endMenu);
// 		}
// 		if (this.controller)
// 			GameObject.delete(this.controller);
// 		if (this.boardBar)
// 			GameObject.delete(this.boardBar);
// 		if (this.rankingDisplay) {
// 			GameObject.delete(this.rankingDisplay);
// 		}
// 		if (this.spawner)
// 			GameObject.delete(this.spawner);
// 		if (this.scoreUI)
// 			GameObject.delete(this.scoreUI);
// 		if (this.scoreUIBackground)
// 			GameObject.delete(this.scoreUIBackground);
// 		if (this.comboUI)
// 			GameObject.delete(this.comboUI);
//
// 		document.removeEventListener("finishGame", this._finish);
// 		document.removeEventListener("addScore", this._addScore);

// 		setTimeout(() => {
// 			cancelAnimationFrame(this.reqAnimGameLoop);
// 		}, 120);
// 	}
// }


export default Game;
