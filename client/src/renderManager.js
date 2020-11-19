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

let originX = 0;
let originY = 0;

let objects = [];


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
			if (object && object.render) {
				let pos = object.getPosition();
				object.render.draw(ctx, pos.x + originX, pos.y + originY);
			}
		})

		// objects.forEach((object) => {
		// 	// if (objet.render.opacity != 1.0)
		// 	// 	this.ctx.globalAlpha = objet.render.opacity;
		// 	if (object.render) {
		// 		object.render.draw(ctx, object.x + originX, object.y + originY);
		// 	}
		// 	// this.ctx.globalAlpha = 1.0;
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

export function addObject(obj) {
	let position = 0;

	// objects.push(obj);
	for (let i = 0; i <= objects.length; i++) {
		if (objects[i] && objects[i].render.zIndex > obj.render.zIndex) {
			position = i;
			break;
		}
		position = i;
	}
	if (!position) {
		objects.push(obj);
	}
	else {
		objects.splice(position, 0, obj);
	}
}

export function deleteObject(obj) {
	const index = objects.findIndex(element => element.id === obj.id);
	if (index == -1)
		return;
	objects.splice(index, 1);
}
