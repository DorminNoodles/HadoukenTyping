// import ryuAnim from './ryuAnim.js';

// import * as pender from './render';
// let SpawnerScript = require('./spawnerScript.js');
import SpawnerScript from './spawnerScript';
import RenderManager from './renderManager';
import ControllerScript from './controller';
import GameObject from './gameObject';
import Render from './render';
import Core from './core';


class Game {

	constructor(type){
		this.canvasBack;
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext("2d");
		this.renderManager = new RenderManager();


		this.canvasBackground();

		if (type == 'versus')
			this.initVersus();

		setTimeout(() => {
			this.gameLoop();
		},25)
	}

	canvasBackground() {
		this.canvasBack = document.getElementById('canvasBack');
		let ctx = this.canvasBack.getContext("2d");

		let img = new Image();   // Crée un nouvel élément Image
		img.src = './backgroundGame.gif';
		img.onload = () => {
			var ptrn = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
			ctx.fillStyle = ptrn;
			ctx.fillRect(0, 0, this.canvasBack.width, this.canvasBack.height); // context.fillRect(x, y, width, height);
		}
	}

	initVersus() {
		let inputController = new GameObject('inputController');
		let boardBar = new GameObject('boardBar');
		let spawner = new GameObject('spawner');

		spawner.setPosition(1330, 250);
		boardBar.setPosition(50, 454);


		spawner.render = new Render('./spawner.gif');
		boardBar.render = new Render('./gameBoardBar.gif');
		spawner.script = new SpawnerScript();
		inputController.script = new ControllerScript(spawner);
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

	renderBackground() {
		// canvas.width = window.innerWidth + 400;
		canvas.width = 1600;
		// canvas.height = window.innerHeight + 400;
		canvas.height = 1400;
		this.ctx.drawImage(this.canvasBack, 0, 0);

	}


}


export default Game;
