// import Render from './render';
import Core from './core';
import Script from './script';

class RenderManager extends Script {

	constructor() {
		super();
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		this.shake = 0;
		this.flash = 0;
		this.pressShake = 0;
		this.pressShakeForce = 1;

		this.addListener('badLetter', () => {
			this.flash = 100;
			this.shake = 10;
		});

		this.addListener('pressShake', (e) => {
			this.pressShake = 3;
			this.pressShakeForce = e.detail.force;
			this.pressShakeForce = (this.pressShakeForce > 25) ? 25 : this.pressShakeForce;
		});
	}

	update() {
		let objects = Core.getGameObjectList();
		let originX = (this.shake > 0) ? this.getRandomInt(40) : 0;
		let originY = (this.shake > 0) ? this.getRandomInt(40) : 0;

		originX = (this.getRandomInt(40) % 2 > 0) ? -originX : originX;
		originY = (this.getRandomInt(40) % 2 > 0) ? -originY : originY;

		originY = (this.pressShake > 0) ? this.pressShakeForce : 0;


		// console.log(objects[0]);
		// console.log(objects[1]);
		// console.log(objects[2]);
		// console.log(objects[3]);
		// console.log(objects[4]);
		// console.log(objects[5]);


		let cloneObjets = [];


		objects.forEach((objet) => {
			if (objet.render)
				cloneObjets.push(objet)
		})

		// let cloneObjets = [...objects];
		cloneObjets.sort(function(a, b) {
			return a.render.zIndex - b.render.zIndex;
		});

		console.log(cloneObjets);

		cloneObjets.forEach((objet) => {
			// if (objet.render) {
				if (objet.render.opacity != 1.0)
					this.ctx.globalAlpha = objet.render.opacity;
				objet.render.draw(this.ctx, objet.x + originX, objet.y + originY);
				this.ctx.globalAlpha = 1.0;
			// }
		})

		objects.forEach((objet) => {
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

		if (this.pressShake > 0)
			this.pressShake--;
	}

	flashScreen(self) {

	}

	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}


}

export default RenderManager;
