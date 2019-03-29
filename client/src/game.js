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
import Core from './core';


class Game {

	constructor(type){
		this.testo = 'hello';
		this.canvasBack;
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext("2d");
		this.renderManager = new RenderManager();
		this.currentState = "inGame";
		this.score = 0;
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

		console.log("te fou de ma gueule ? : ", this.score);

		this.canvasBackground();

		this.states[this.currentState].init();

		setTimeout(() => {
			this.gameLoop();
		},25)

		document.addEventListener("finish", () => {
			// GameObject.delete(this.spawner);
			this.changeState("endGame");
			console.log("FINISH +++++++++++++++++");
		})

		document.addEventListener("addScore", (e) => {
			// console.log("pute", e.detail.score)
			this.addScore(e.detail.score);
		});
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

	initSolo() {
		console.log(this.testo);
		console.log("first this score : ", this.score)
		let inputController = new GameObject('inputController');
		this.boardBar = new GameObject('boardBar');
		this.spawner = new GameObject('spawner');

		this.spawner.setPosition(1330, 250);
		this.boardBar.setPosition(50, 454);


		this.spawner.render = new Render('./spawner.gif');
		this.boardBar.render = new Render('./gameBoardBar.gif');
		this.spawner.script = new SpawnerScript();
		inputController.script = new ControllerScript(this.spawner);

		this.scoreUI = new GameObject('scoreUI');
		this.scoreUIBackground = new GameObject('scoreUIBackground');
		this.scoreUIBackground.render = new Render('./backgroundScore.png');
		this.scoreUIBackground.setPosition(650, 10);
		this.scoreUI.renderText = new RenderText('./gameFont1.png', '00000', 15);
		this.scoreUI.setPosition(650, 30);


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
		// console.log("ADD SCORE : " + this.score);
		this.score += 20;
		console.log(this.score);
	}

	endSolo() {
		GameObject.delete(this.spawner);
		GameObject.delete(this.boardBar);
		GameObject.delete(this.scoreUIBackground);
		GameObject.delete(this.scoreUI);
		console.log("END GAME **********");

		this.finishScorePanel = new GameObject('finishScorePanel');
		this.finishScorePanel.setPosition(420, -1000);
		this.finishScorePanel.render = new Render('./finishScore.png');
		this.finishScorePanel.addScript(new SoloFinish());

		this.scoreText = new GameObject('scoreText');
		// this.scoreText.renderText = new RenderText('./gameFont3.png', 'qq' + this.score.toString(), 22);

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
		console.log("this.states : " + this.currentState);
		this.states[this.currentState].end();
		this.currentState = state;
		this.states[this.currentState].init();
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
