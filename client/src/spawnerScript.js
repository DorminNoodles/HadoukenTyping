import GameObject from './gameObject';
import Render from './render';
import LetterScript from './letterScript.js';

import RenderManager from './renderManager.js';

import * as anim from '../anim/animLetter';

class SpawnerScript {

	constructor() {
		this.begin = Date.now();
		this.nextSpawn = Date.now() + 2000;
		this.spawnSpeed = 800;
		this.boardArray = [];
		this.letterQuantity = 0;
		this.alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		this.nextChangeSpeed = Date.now() + 10000;
		this.changeSpeedDelay = 4000;
		this.speedReduce = 20;
	}

	update() {

		if (this.nextChangeSpeed < Date.now()) {
			this.spawnSpeed -= this.speedReduce;
			this.nextChangeSpeed = Date.now() + this.changeSpeedDelay;
		}

		if (this.nextSpawn < Date.now()) {

			let letter = new GameObject('letter');
			let rand = this.getRandomInt(6);
			let randomLetter = this.alpha[rand];

			this.boardArray[this.letterQuantity] = letter;
			letter.render = new Render('./boutonLetters.png');


			letter.render.addAnim(anim['anim' + randomLetter.toUpperCase()]);
			letter.render.addAnim(anim['anim' + randomLetter.toUpperCase() + 'Flash']);
			letter.setPosition(1340, 252);
			letter.addScript(new LetterScript(this.letterQuantity, randomLetter, letter));

			this.letterQuantity++;
			this.nextSpawn = Date.now() + this.spawnSpeed;
		}
	}

	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	getBoardArray() {
		return this.boardArray;
	}

	deleteLetter(key) {
		if (this.boardArray[0] && key == this.boardArray[0].script.letter) {
			if (this.boardArray[0].script.isVulnerable()) {

				this.boardArray[0].script.deleteLetter();
				this.boardArray[0] = undefined;
				this.letterQuantity--;

				for(let i = 0; i < this.boardArray.length; i++) {
					if (this.boardArray[i]) {
						this.boardArray[i].script.changePosition();
						this.boardArray[i - 1] = this.boardArray[i];
						this.boardArray[i] = undefined;
					}
				}
				RenderManager.shake();
			}
		}
	}
}

export default SpawnerScript;
