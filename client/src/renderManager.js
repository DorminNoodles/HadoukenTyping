// import Render from './render';
import Core from './core';

class RenderManager {

	constructor() {
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		this.shake = 0;
		this.shakeYArr = [5,-10,5];
	}

	update() {
		let objets = Core.getGameObjectList();
		// let originX = this.shakeX
		let originY = (this.shake) ? this.shakeYArr[this.shake] : 0;

		objets.forEach((objet) => {
			if (objet.render) {
				objet.render.draw(this.ctx, objet.x, objet.y + originY);
			}
		})

		objets.forEach((objet) => {
			if (objet.renderText) {
				objet.renderText.draw(this.ctx, objet.x, objet.y);
			}
		})

		if (this.shake)
			this.shake--;
	}

	static shake() {
		console.log("SHAKE");
		this.shake = 3;
	}
}

export default RenderManager;
