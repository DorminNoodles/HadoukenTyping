// import Render from './render';
import Core from './core';

class RenderManager {

	constructor() {
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
	}

	update() {
		let objets = Core.getGameObjectList();

		objets.forEach((objet) => {
			if (objet.render) {
				this.ctx.drawImage(objet.render.img, objet.x, objet.y);
			}
		})
	}
}

export default RenderManager;
