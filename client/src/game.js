// import ryuAnim from './ryuAnim.js';

// import * as pender from './render';
import renderManager from './renderManager';

import GameObject from './gameObject';
import Render from './render';


class Game {

	constructor(type){

		console.log("puttttttttt");

		this.canvasBack;
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext("2d");

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
		// this.gameLoop();

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
		let spawner = new GameObject('spawner');

		spawner.setPosition(20, 20);

		spawner.render = new Render();
	}

	gameLoop() {
		console.log("gamelooop");
		console.log("fuck you animationFrame");

		let loop = (e) => {
			// console.log(e);

			this.renderBackground();

			requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);
	}

	renderBackground() {
		// console.log("render");
		if (this.canvas.width != window.innerWidth || this.canvas.height != window.innerHeight) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			this.ctx.drawImage(this.canvasBack, 0, 0);
		}
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
