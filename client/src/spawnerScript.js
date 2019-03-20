import GameObject from './gameObject';
import Render from './render';
import LetterScript from './letterScript.js';

class SpawnerScript {

	constructor() {
		this.begin = Date.now();
		this.nextSpawn = Date.now() + 2000;
		this.spawnSpeed = 400;
		this.boardArray = [];
		this.letterQuantity = 0;
		this.alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
		this.nextChangeSpeed = Date.now() + 10000;
		this.changeSpeedDelay = 10000;
		this.speedReduce = 25;
	}

	update() {

		if (this.nextChangeSpeed < Date.now()) {
			this.spawnSpeed -= this.speedReduce;
			this.nextChangeSpeed = Date.now() + this.changeSpeedDelay;
		}

		if (this.nextSpawn < Date.now()) {

			let letter = new GameObject('letter');
			let randomLetter = this.alpha[this.getRandomInt(4)];

			this.boardArray[this.letterQuantity] = letter;
			// console.log("###################################",letter.id);

			letter.render = new Render('./boutonLetters' + randomLetter.toUpperCase() + '.gif');
			letter.setPosition(1340, 252);
			letter.addScript(new LetterScript(this.letterQuantity, randomLetter));

			this.letterQuantity++;
			this.nextSpawn = Date.now() + this.spawnSpeed;
			// spaceAvailable()
			// this.boardArray
		}
		// console.log("update from script");
	}

	getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	spaceAvailable(position) {

		// if (position == 0) {
		// 	return 0;
		// }
		// if (!this.boardArray[position - 1]) {
		// 	this.boardArray[position] = undefined;
		// 	this.boardArray[position - 1] = true;
		// 	return position - 1;
		// }
	}

	getBoardArray() {
		return this.boardArray;
	}

	deleteLetter(key) {

		if (this.boardArray[0] && key == this.boardArray[0].script.letter) {
			if (this.boardArray[0].script.isVulnerable()) {

				GameObject.deleteGameObject(this.boardArray[0]);
				this.boardArray[0] = undefined;
				this.letterQuantity--;


				for(let i = 0; i < this.boardArray.length; i++) {
					console.log("for : ", this.boardArray[i]);
					if (this.boardArray[i]) {
						this.boardArray[i].script.changePosition();
						this.boardArray[i-1] = this.boardArray[i];
						this.boardArray[i] = undefined;
					}
				}
				console.log(this.boardArray);
			}
		}
	}
}

export default SpawnerScript;
