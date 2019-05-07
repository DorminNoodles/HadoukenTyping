import { animCombo, idleCombo } from './anim/animCombo';
import RenderManager from './renderManager.js';
import { animFlash } from './anim/animFlash';
import { animChain } from './anim/animChain';
import LetterScript from './letterScript.js';
import ComboScript from './comboScript.js';
import * as anim from './anim/animLetter';
import GameObject from './gameObject';
import Render from './render';
import RenderText from './renderText';
import Script from './script';

import cursorUI from './gameObjects/cursorUI/cursorUI';
import letterAsian from './gameObjects/letterAsian/letterAsian';
import letterTime from './gameObjects/letterTime/letterTime';

class SpawnerScript extends Script {

	constructor() {
		super();
		this.begin = Date.now();
		this.nextSpawn = Date.now() + 2000;

		this.spawnSpeed = 45;
		this.spawnSpeedDelta = 60000 / this.spawnSpeed;
		// this.spawnSpeed = 200;
		this.boardArray = [];
		this.letterQuantity = 0;
		this.alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		this.nextChangeSpeed = Date.now() + 10000;
		this.changeSpeedDelay = 4000;
		this.speedReduce = 15;
		this.deadTime = false; //additional time before realy dead
		this.chain = 0;
		this.combo = 0;
		this.currentLetter = 0;
		this.totalLetters = 0;
		this.doubleShot = false;

		this.addListener('finishGame', () => {
				this.deleteAllLetter();
		})


		this.speedUI = this.newObject(new GameObject('speedUI'));
		this.speedUI.setPosition(0,0);
		this.speedUI.renderText = new RenderText('./gameFont1.png', this.spawnSpeed.toString() + ' lbm', 15, 46);

		this.cursorUI = this.newObject(cursorUI());
	}

	update() {

		if (this.boardArray[this.currentLetter]) {
			this.cursorUI.setPosition(this.boardArray[this.currentLetter].x - 20, this.boardArray[this.currentLetter].y - 26);
		}

		// if (this.nextChangeSpeed < Date.now()) {
		// 	this.spawnSpeed;
		// 	this.nextChangeSpeed = Date.now() + this.changeSpeedDelay;
		// }

		if (this.nextSpawn < Date.now()) {

			this.totalLetters++;
			if (!(this.totalLetters % 5))
				this.spawnAsianLetter();
			else if (!(this.totalLetters % 8))
				this.spawnLetterTime();
			else
				this.spawnStandardLetter();


			this.letterQuantity++;
			this.nextSpawn = Date.now() + this.spawnSpeedDelta + ((this.letterQuantity * this.letterQuantity));

			let eventLetterSpawned = new CustomEvent("letterSpawned", {
				detail : {'qty' : this.letterQuantity}
			});
			document.dispatchEvent(eventLetterSpawned);

			if (this.letterQuantity > 15 && this.deadTime == false) {
				this.deadTime = true;
				setTimeout(() => {
					if (this.letterQuantity > 15) {
						console.log("EVENT FINISH");
						let evt = new Event("finishGame", {"bubbles":true, "cancelable":false});
						document.dispatchEvent(evt);
					}
					this.deadTime = false;
				}, 500);
			}
		}


		for (let i = 0; i < 16; i++) {
			if (i > 0 && this.boardArray[i]) {

				if (!this.boardArray[i - 1]) {
					this.boardArray[i].script.changePosition();
					this.boardArray[i - 1] = this.boardArray[i];
					delete this.boardArray[i];
				}
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
			console.log(this.boardArray[this.currentLetter].script.letter);
			if (key == this.boardArray[this.currentLetter].script.letter) {
				if (this.boardArray[this.currentLetter].script.isVulnerable()) {
					if (!(this.chain % 5))
						this.activeCombo(this.boardArray[this.currentLetter].x, this.boardArray[this.currentLetter].y);
					this.boardArray[this.currentLetter].script.deleteLetter(true);
					delete this.boardArray[this.currentLetter]
					this.letterQuantity--;

				//doubleShot
					if (this.boardArray[this.currentLetter + 1] && this.doubleShot) {
						if (this.boardArray[this.currentLetter + 1].script.isVulnerable()) {
							this.boardArray[this.currentLetter + 1].script.deleteLetter(true);
							delete this.boardArray[this.currentLetter + 1]
							this.letterQuantity--;
						}
					}

				//for bonus
					if (this.boardArray[this.currentLetter + 1] && this.doubleShot) {
						if (this.boardArray[this.currentLetter + 1].script.isVulnerable()) {
							this.boardArray[this.currentLetter + 1].script.deleteLetter(true);
							delete this.boardArray[this.currentLetter + 1]
							this.letterQuantity--;
						}
					}

				//delete stone on left
					if (this.boardArray[this.currentLetter - 1]) {
						this.boardArray[this.currentLetter - 1].script.stone();
						if (this.boardArray[this.currentLetter - 1].script.getStoneLife() < 11) {
							this.boardArray[this.currentLetter - 1].script.deleteLetter(true);
							delete this.boardArray[this.currentLetter - 1];
							this.letterQuantity--;
							this.currentLetter--;
							for (let i = this.currentLetter - 1; i >= 0; i--) {
								if (this.boardArray[i].script.getStoneLife() == 11) {
									this.boardArray[i].script.deleteLetter(true);
									delete this.boardArray[i];
									this.letterQuantity--;
									this.currentLetter--;
								}
								else
									break;
							}
						}
					}

					this.chain++;
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

	spawnStandardLetter() {

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


	}

	spawnAsianLetter() {

		let letter = this.newObject(letterAsian(15, 'a'));
		// let rand = this.getRandomInt(5);
		// let randomLetter = this.alpha[rand];

		this.boardArray[15] = letter;
		letter.setPosition(1335, 235);
		// letter.render = new Render('./asianLetters.png');
	}

	spawnLetterTime() {

		let letter = this.newObject(letterTime(15));

		this.boardArray[15] = letter;
		letter.setPosition(1335, 235);
	}

	activeCombo(x, y) {
		let event = new Event('combo');
		document.dispatchEvent(event);
		this.combo++;
		if (this.combo > 5)
			this.doubleShot = true;

		let comboUI = new GameObject('combo');
		comboUI.addScript(new ComboScript());
		comboUI.setPosition(x - 28, y);
		comboUI.render = new Render('./combo.png');
		comboUI.render.addAnim(animCombo);
		comboUI.render.addAnim(idleCombo);
		setTimeout(() => {
			GameObject.delete(comboUI);
		}, 1200);
	}

	breakCombo() {
		this.combo = 0;
		this.chain = 0;
		this.doubleShot = false;
		let event = new Event('badLetter');
		document.dispatchEvent(event);
	}

	deleteAllLetter() {
		for (let i = 0; i < this.boardArray.length; i++) {
			if (this.boardArray[i]) {
				this.boardArray[i].script.deleteLetter(false);
			}
		}
	}
}

export default SpawnerScript;
