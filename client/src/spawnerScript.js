import GameObject from './gameObject';
import Render from './render';
import LetterScript from './letterScript.js';

class SpawnerScript {

	constructor() {
		this.begin = Date.now();
		this.nextSpawn = Date.now() + 2000;
		this.spawnSpeed = 500;
		this.boardArray = [];
		this.letterQuantity = 0;
	}

	update() {

		if (this.nextSpawn < Date.now()) {

			let letter = new GameObject('letter');

			this.boardArray[this.letterQuantity] = letter;
			// console.log("###################################",letter.id);

			letter.render = new Render('./boutonLettersA.gif');
			letter.setPosition(1340, 252);
			letter.addScript(new LetterScript(this.letterQuantity, 'a'));

			this.letterQuantity++;
			this.nextSpawn = Date.now() + this.spawnSpeed;
			// spaceAvailable()
			// this.boardArray
		}
		// console.log("update from script");
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
			GameObject.deleteGameObject(this.boardArray[0]);
			this.boardArray[0] = undefined;
			this.letterQuantity--;




			for(let i = 0; i < this.boardArray.length; i++) {
				console.log("for : ", this.boardArray[i]);
				if (this.boardArray[i]) {
					this.boardArray[i].script.changePosition();
					this.boardArray[i-1] = this.boardArray[i];
					this.boardArray[i] = undefined;
					// console.log("FUCK YOU");
				}
			}

			console.log(this.boardArray);

		}
	}
}

export default SpawnerScript;
