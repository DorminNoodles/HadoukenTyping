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
				objet.render.draw(this.ctx, objet.x, objet.y)
			}
		})
	}
}

export default RenderManager;
