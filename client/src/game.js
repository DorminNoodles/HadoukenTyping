// import ryuAnim from './ryuAnim.js';

// import * as pender from './render';
// let SpawnerScript = require('./spawnerScript.js');
import SpawnerScript from './spawnerScript';
import RenderManager from './renderManager';
import ControllerScript from './controller';
import GameObject from './gameObject';
import RenderText from './renderText';
import Render from './render';
import Core from './core';


class Game {

	constructor(type){
		this.canvasBack;
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext("2d");
		this.renderManager = new RenderManager();
		this.currentState = "inGame";
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

	initVersus() {
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
		this.scoreUIBackground.setPosition(600, 10);
		this.scoreUI.renderText = new RenderText('./gameFont1.png', '00000');
		this.scoreUI.setPosition(600, 30);

		document.addEventListener("addScore", (score) => {
			let total = this.scoreUI.renderText.getText();
			total = (parseInt(total) + 100).toString();
			this.scoreUI.renderText.changeText(total);
		})
	}

	initSolo() {
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
		this.scoreUIBackground.setPosition(600, 10);
		this.scoreUI.renderText = new RenderText('./gameFont1.png', '00000');
		this.scoreUI.setPosition(600, 30);

		document.addEventListener("addScore", (score) => {
			let total = this.scoreUI.renderText.getText();
			total = (parseInt(total) + 100).toString();
			this.scoreUI.renderText.changeText(total);
		})
	}

	endSolo() {
		GameObject.delete(this.spawner);
		GameObject.delete(this.boardBar);
		console.log("END GAME **********");

		this.finishScorePanel = new GameObject('finishScorePanel');
		this.finishScorePanel.setPosition(50,50);
		this.finishScorePanel.render = new Render('./finishScore.png');


	}

	gameLoop() {
		console.log("gamelooop");
		console.log("fuck you animationFrame");

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
		// console.log(this.states);
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
