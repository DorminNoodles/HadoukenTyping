// import Render from './render';
import Core from './core';

class RenderManager {

	constructor() {
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		this.shake = 0;
		// this.shakeYArr = [5,-10,5];
		this.flash = 0;

		document.addEventListener('badLetter', () => {
			this.flash = 100;
			this.shake = 10;
			// this.flashScreen(this);
		});
	}

	update() {
		let objets = Core.getGameObjectList();
		let originX = (this.shake > 0) ? this.getRandomInt(40) : 0;
		let originY = (this.shake > 0) ? this.getRandomInt(40) : 0;

		originX = (this.getRandomInt(40) % 2 > 0) ? -originX : originX;
		originY = (this.getRandomInt(40) % 2 > 0) ? -originY : originY;
		// let originY = (this.shake) ? this.shakeYArr[this.shake] : 0;
		// let originY = (this.shake) ? this.shakeYArr[this.shake] : 0;
		// let originY = (this.shake) ? this.shakeYArr[this.shake] : 0;
		// let originY = (this.shake) ? 0 : 0;

		objets.forEach((objet) => {
			if (objet.render) {
				objet.render.draw(this.ctx, objet.x + originX, objet.y + originY);
			}
		})

		objets.forEach((objet) => {
			if (objet.renderText) {
				objet.renderText.draw(this.ctx, objet.x + originX, objet.y + originY);
			}
		})

		if (this.flash > 0) {
			let opacity = 0.01 * this.flash;
			this.ctx.fillStyle = 'rgba(225,225,225,'+ opacity +')';
			this.ctx.fillRect(0,0, 5000, 5000);
			this.flash -=20;
		}

		if (this.shake > 0)
			this.shake--;
	}

	flashScreen(self) {
		console.log("FLASHSCREEN");
		console.log(self);
	}

	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	// static shake() {
	// 	console.log("SHAKE");
	// 	this.shake = 3;
	// }
}

export default RenderManager;
