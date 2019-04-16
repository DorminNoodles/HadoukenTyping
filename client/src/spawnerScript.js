import { animCombo, idleCombo } from './anim/animCombo';
import RenderManager from './renderManager.js';
import { animFlash } from './anim/animFlash';
import { animChain } from './anim/animChain';
import LetterScript from './letterScript.js';
import ComboScript from './comboScript.js';
import * as anim from './anim/animLetter';
import GameObject from './gameObject';
import Render from './render';
import Script from './script';


class SpawnerScript extends Script {

	constructor() {
		super();
		this.begin = Date.now();
		this.nextSpawn = Date.now() + 2000;
		// this.spawnSpeed = 500;
		this.spawnSpeed = 800;
		this.boardArray = [];
		this.letterQuantity = 0;
		this.alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		this.nextChangeSpeed = Date.now() + 10000;
		this.changeSpeedDelay = 4000;
		this.speedReduce = 20;
		this.deadTime = false; //additional time before realy dead
		this.combo = 0;
		this.currentLetter = 0;

		document.addEventListener('finish', () => {
				this.deleteAllLetter();
		})
	}

	update() {

		if (this.nextChangeSpeed < Date.now()) {
			this.spawnSpeed -= this.speedReduce;
			this.nextChangeSpeed = Date.now() + this.changeSpeedDelay;
		}

		if (this.nextSpawn < Date.now()) {

			let letter = this.newObject(new GameObject('letter'));
			let rand = this.getRandomInt(5);
			let randomLetter = this.alpha[rand];

			this.boardArray[15] = letter;
			letter.render = new Render('./boutonLetters.png');

			letter.render.addAnim(anim['anim' + randomLetter.toUpperCase()]);
			letter.render.addAnim(anim['anim' + randomLetter.toUpperCase() + 'Flash']);
			letter.render.addAnim(anim['animStone01']);
			letter.render.addAnim(anim['animStone02']);
			letter.render.addAnim(anim['animStone03']);
			letter.render.addAnim(anim['animStone04']);
			letter.render.addAnim(anim['animStone05']);
			letter.render.addAnim(anim['animStone06']);
			letter.render.addAnim(anim['animStone07']);
			letter.render.addAnim(anim['animStone08']);
			letter.render.addAnim(anim['animStone09']);
			letter.setPosition(1340, 252);
			letter.addScript(new LetterScript(15, randomLetter, letter));

			this.letterQuantity++;
			this.nextSpawn = Date.now() + this.spawnSpeed + ((this.letterQuantity * this.letterQuantity));


			if (this.letterQuantity > 15 && this.deadTime == false) {
				this.deadTime = true;
				console.log("DEAD TIME !");
				setTimeout(() => {
					if (this.letterQuantity > 15) {
						let evt = new Event("finish", {"bubbles":true, "cancelable":false});
						document.dispatchEvent(evt);
					}
					this.deadTime = false;
				}, 500);
			}
		}

		// console.log(this.letterQuantity);

		for (let i = 0; i < 16; i++) {
			if (i > 0 && this.boardArray[i]) {

				if (!this.boardArray[i - 1]) {
					this.boardArray[i].script.changePosition();
					this.boardArray[i - 1] = this.boardArray[i];
					delete this.boardArray[i];
				}
				// else {
				// 	console.log("alfred > ", this.boardArray[i - 1].script.letter)
				// }
			}
		}
	}

	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	getBoardArray() {
		return this.boardArray;
	}

	deleteLetter(key) {
		if (this.boardArray[this.currentLetter]) {
			if (key == this.boardArray[this.currentLetter].script.letter) {
				if (this.boardArray[this.currentLetter].script.isVulnerable()) {
			//
					if (!(this.combo % 5))
						this.activeCombo(this.boardArray[this.currentLetter].x, this.boardArray[this.currentLetter].y);
					this.boardArray[this.currentLetter].script.deleteLetter();
					delete this.boardArray[this.currentLetter]
					this.letterQuantity--;

					console.log("Here1#  ");
					if (this.boardArray[this.currentLetter - 1]) {
						this.boardArray[this.currentLetter - 1].script.stone();
						if (this.boardArray[this.currentLetter - 1].script.getStoneLife() < 11) {
							console.log("Here2#  ");
							this.boardArray[this.currentLetter - 1].script.deleteLetter();
							delete this.boardArray[this.currentLetter - 1];
							this.letterQuantity--;
							this.currentLetter--;
							console.log("Here3#  ");
							for (let i = this.currentLetter - 1; i >= 0; i--) {
								// this.boardArray[i].script.stone();
								console.log("ICI ", this.boardArray[i].script.getStoneLife());
								if (this.boardArray[i].script.getStoneLife() == 11) {
									this.boardArray[i].script.deleteLetter();
									delete this.boardArray[i];
									this.letterQuantity--;
									this.currentLetter--;
								}
								else
									break;
							}
						}
					}




					this.combo++;
					// for (let i = 0; i < this.boardArray.length; i++) {
					// 	if (this.boardArray[i]) {
					// 		i = this.boardArray[i].script.changePosition(this.boardArray, i, this.boardArray[i]) ? :
					// 		// this.boardArray[i - 1] = this.boardArray[i];
					// 	}
					// }
				}
			}
			else {
				this.boardArray[this.currentLetter].script.stone();
				this.breakCombo();
				let chain = this.newObject(new GameObject('animChain'));
				chain.setPosition(this.boardArray[this.currentLetter].x - 46, this.boardArray[this.currentLetter].y - 56);
				chain.render = new Render('./chain.png');
				chain.render.addAnim(animChain);
				setTimeout(() => {
					GameObject.delete(chain);
				}, 1000);
				this.currentLetter++;
			}
		}
	}

	activeCombo(x, y) {

		console.log("ACTIVE COMBO");

		let event = new Event('combo');
		document.dispatchEvent(event);

		let comboUI = new GameObject('combo');
		comboUI.addScript(new ComboScript());
		comboUI.setPosition(x - 25, y);
		comboUI.render = new Render('./combo.png');
		comboUI.render.addAnim(animCombo);
		comboUI.render.addAnim(idleCombo);
		setTimeout(() => {
			GameObject.delete(comboUI);
		}, 1200);
	}

	breakCombo() {
		this.combo = 0;
		let event = new Event('badLetter');

		document.dispatchEvent(event);
	}

	deleteAllLetter() {
		console.log("Hello delete all letter");
		for (let i = 0; i < this.boardArray.length; i++) {
			if (this.boardArray[i]) {
				this.boardArray[i].script.deleteLetter();
			}
		}
	}
}

export default SpawnerScript;
