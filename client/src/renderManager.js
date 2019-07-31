// import Render from './render';
import Core from './core/core';
import Script from './core/script';


/*
	Je ne garde pas de list des render mais je get la list des gameObject et je
	vais voir dans chacun si il y a un render....
	C est peut etre pas super opti

	recupere un event qui supprime le render avec l id de l objet

	bon vu que je dois render avec la position de l objet..... fuck

	Je garde l ordre des objets leur id (il est en correlation avec la position dans la list)

	Solution : je copie la list et je parse tous les objets, si ils ont un zIndex de 0 ou pas du tout je les delete
	de la list une fois terminé je reprends la liste de 0 mais pour les zIndex == 1 jusqu' a ce qu elle soit vide.
*/

class RenderManager extends Script {

	constructor() {
		super();
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		this.shake = 0;
		this.flash = 0;
		this.pressShake = 0;
		this.pressShakeForce = 1;
		this.renderList = [];

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



		let cloneObjects = [];

		objects.forEach((objet) => {
			if (objet.render)
				cloneObjects.push(objet)
		})

		// cloneObjects.sort(function(a, b) {
		// 	return a.render.zIndex - b.render.zIndex;
		// });


		console.log('update$$$$$$$$$$$$$$$');


		let test = [{zindex: 0}, {zindex: 1}, {zindex: 2}];

		// while (test.length > 0) {
		// 	test.splice(0,1);
		// }
		//
		// console.log('size : ', test.length);
		//
		// console.log(test)

		let test = objects;

		let i = 0;

		while (test.length > 0) {
			test.forEach((elem, index) => {
				if (!elem.render)
					test.splice(index, 1);
				else if (elem.zIndex == i)
					test.splice(index, 1);
			})
			i++;
		}




		cloneObjects.forEach((objet) => {
			if (objet.render.opacity != 1.0)
				this.ctx.globalAlpha = objet.render.opacity;
			objet.render.draw(this.ctx, objet.x + originX, objet.y + originY);
			this.ctx.globalAlpha = 1.0;
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
