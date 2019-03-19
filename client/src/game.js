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
		// setInterval(() => {
		// 	this.renderBackground();
		// },1);
		// setTimeout(this.gameLoop, 100);
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


		// let SpawnerScript = require('./spawnerScript.js');

		spawner.render = new Render('./spawner.gif');
		boardBar.render = new Render('./gameBoardBar.gif');
		spawner.script = new SpawnerScript();
		inputController.script = new ControllerScript(spawner);

		// console.log();
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
		// if (this.canvas.width != window.innerWidth || this.canvas.height != window.innerHeight) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			this.ctx.drawImage(this.canvasBack, 0, 0);
		// }
		// this.ctx.drawImage(this.canvasBack, 0, 0);
		// console.log(this.canvas.width);
		// if (this.canvas.width != window.innerWidth) {
		// 	// console.log("HElllo");
		// 	// let img = new Image();   // Crée un nouvel élément Image
		// 	let img = new Image();   // Crée un nouvel élément Image
		// 	img.src = './backgroundGame.gif';
		// 	img.onload = () => {
		// 		var ptrn = this.ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
		// 		this.ctx.fillStyle = ptrn;
		// 		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // context.fillRect(x, y, width, height);
		// 	}
		// }
	}


}


export default Game;
