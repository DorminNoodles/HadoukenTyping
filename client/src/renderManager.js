// import Render from './render';
import * as Core from './core/core';
import Script from './core/script';


/*
	Je ne garde pas de list des render mais je get la list des gameObject et je
	vais voir dans chacun si il y a un render....
	/!\ PAS OPTI /!\

	Solution 1 : je copie la list et je parse tous les objets, si ils ont un zIndex de 0 ou pas du tout je les delete
	de la list une fois terminé je reprends la liste de 0 mais pour les zIndex == 1 jusqu' a ce qu elle soit vide.

	Solution 2 : je trie la liste a chaque fois

	Solution 3 : je fais une nouvelle liste juste pour renderManager, mais j'ai besoin d'un flag pour savoir si il y a eu
	un nouvel objet
*/

// class RenderManager extends Script {

// 	constructor() {
// 		super();
// 		this.canvas = document.getElementById("canvas");
// 		this.shake = 0;
// 		this.flash = 0;
// 		this.pressShake = 0;
// 		this.pressShakeForce = 1;
// 		this.objects = [];

// 		this.addListener('badLetter', () => {
// 			this.flash = 100;
// 			this.shake = 10;
// 		});

// 		this.addListener('pressShake', (e) => {
// 			this.pressShake = 3;
// 			this.pressShakeForce = e.detail.force;
// 			this.pressShakeForce = (this.pressShakeForce > 25) ? 25 : this.pressShakeForce;
// 		});
// 	}
let originX = 0;
let originY = 0;

let objects = [];

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");


export function update() {
		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");

		//clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// console.log(objects);
		// let objects = Core.getGameObjectList();
		// let originX = (this.shake > 0) ? this.getRandomInt(40) : 0;
		// let originY = (this.shake > 0) ? this.getRandomInt(40) : 0;

		// originX = (this.getRandomInt(40) % 2 > 0) ? -originX : originX;
		// originY = (this.getRandomInt(40) % 2 > 0) ? -originY : originY;

		// originY = (this.pressShake > 0) ? this.pressShakeForce : 0;



		// let cloneObjects = [];

		// objects.forEach((objet) => {
		// 	if (objet.render)
		// 		cloneObjects.push(objet)
		// })

		// // cloneObjects.sort(function(a, b) {
		// // 	return a.render.zIndex - b.render.zIndex;
		// // });






		// cloneObjects.forEach((elem, index) => {
		// 	if (elem.render) {
		// 		cloneObjects.splice(index, 1);

		// 	}

		// });


		// // while (test.length > 0) {
		// // 	test.splice(0,1);
		// // }
		// //
		// //

		// // let test = objects;
		// //
		// // let i = 0;
		// //
		// // while (test.length > 0) {
		// // 	test.forEach((elem, index) => {
		// // 		if (!elem.render)
		// // 			test.splice(index, 1);
		// // 		else if (elem.zIndex == i)
		// // 			test.splice(index, 1);
		// // 	})
		// // 	i++;
		// // }

		objects.forEach((object) => {
						// console.log("render id : ", object.id, "    name : ", object.name);
			if (object.render)
				object.render.draw(ctx, object.x + originX, object.y + originY);
		})

		// objects.forEach((object) => {
		// 	// if (objet.render.opacity != 1.0)
		// 	// 	this.ctx.globalAlpha = objet.render.opacity;
		// 	if (object.render) {
		// 		// console.log("render id : ", object.id, "    name : ", object.name);
		// 		object.render.draw(ctx, object.x + originX, object.y + originY);
		// 	}
		// 	// this.ctx.globalAlpha = 1.0;
		// })

		// objects.forEach((object) => {
		// 	if (object.renderText)
		// 		object.renderText.draw(this.ctx, object.x + originX, object.y + originY);
		// })

		// if (this.flash > 0) {
		// 	let opacity = 0.01 * this.flash;
		// 	this.ctx.fillStyle = 'rgba(225,225,225,'+ opacity +')';
		// 	this.ctx.fillRect(0,0, 5000, 5000);
		// 	this.flash -=20;
		// }

		// if (this.shake > 0)
		// 	this.shake--;

		// if (this.pressShake > 0)
		// 	this.pressShake--;
}
	// flashScreen(self) {

	// }
// }

export function addObject(obj) {
	let position = 0;

	for (let i = 0; i <= objects.length; i++) {
		if (objects[i] && objects[i].render.zIndex > obj.render.zIndex) {
			position = i;
			break;
		}
		position = i;
	}
	// console.log("34253: find position ", position, "   > ", obj);
	if (!position) {
		// console.log("9847: just push ", obj.name);
		objects.push(obj);
	}
	else {
		// console.log("32421: splice ", obj.name, '    position > ', position);
		objects.splice(position, 0, obj);
	}

	// console.log("70942: objects > ", JSON.stringify(objects));

}

// export default RenderManager;
