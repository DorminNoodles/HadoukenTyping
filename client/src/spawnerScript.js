import { animCombo, idleCombo } from '../anim/animCombo';
import RenderManager from './renderManager.js';
import { animFlash } from '../anim/animFlash';
import { animChain } from '../anim/animChain';
import LetterScript from './letterScript.js';
import ComboScript from './comboScript.js';
import * as anim from '../anim/animLetter';
import GameObject from './gameObject';
import Render from './render';
import Script from './script';


class SpawnerScript extends Script {

	constructor() {
		super();
		this.begin = Date.now();
		this.nextSpawn = Date.now() + 2000;
		// this.spawnSpeed = 500;
		this.spawnSpeed = 50;
		this.boardArray = [];
		this.letterQuantity = 0;
		this.alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		this.nextChangeSpeed = Date.now() + 10000;
		this.changeSpeedDelay = 4000;
		this.speedReduce = 20;
		this.deadTime = false; //additional time before realy dead
		this.combo = 0;

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

			let letter = new GameObject('letter');
			let rand = this.getRandomInt(5);
			let randomLetter = this.alpha[rand];

			this.boardArray[this.letterQuantity] = letter;
			letter.render = new Render('./boutonLetters.png');


			letter.render.addAnim(anim['anim' + randomLetter.toUpperCase()]);
			letter.render.addAnim(anim['anim' + randomLetter.toUpperCase() + 'Flash']);
			letter.setPosition(1340, 252);
			letter.addScript(new LetterScript(this.letterQuantity, randomLetter, letter));

			this.letterQuantity++;
			this.nextSpawn = Date.now() + this.spawnSpeed + ((this.letterQuantity * this.letterQuantity));

			console.log(this.letterQuantity);

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
	}

	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	getBoardArray() {
		return this.boardArray;
	}

	deleteLetter(key) {
		if (this.boardArray[0]) {
			if (key == this.boardArray[0].script.letter) {
				if (this.boardArray[0].script.isVulnerable()) {

					this.combo++;
					console.log(this.boardArray[0]);
					if (!(this.combo % 5))
						this.activeCombo(this.boardArray[0].x, this.boardArray[0].y);


					this.boardArray[0].script.deleteLetter();
					this.boardArray[0] = undefined;
					this.letterQuantity--;


					for (let i = 0; i < this.boardArray.length; i++) {
						if (this.boardArray[i]) {
							this.boardArray[i].script.changePosition();
							this.boardArray[i - 1] = this.boardArray[i];
							this.boardArray[i] = undefined;
						}
					}
				}
			}
			else {
				this.breakCombo();

				let chain = new GameObject('animChain');
				chain.setPosition(this.boardArray[0].x - 46, this.boardArray[0].y - 56);
				chain.render = new Render('./chain.png');
				chain.render.addAnim(animChain);

				setTimeout(() => {
					GameObject.delete(chain);
				}, 1000);
			}
		}
	}

	activeCombo(x, y) {

		console.log("ACTIVE COMBO");

		let event = new Event('combo');
		document.dispatchEvent(event);

		// console.log("combo", this.combo % 5);
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
		console.log("BREAK COMBO");
		this.combo = 0;
		// document.addEventListener("badLetter", {})
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
