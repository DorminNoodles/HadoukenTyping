import GameObject from './gameObject';
import Render from './render';
import LetterScript from './letterScript.js';

class SpawnerScript {

	constructor() {
		this.begin = Date.now();
		this.nextSpawn = Date.now() + 2000;
		this.spawnSpeed = 5000;
		this.boardArray = [];
	}

	update() {

		if (this.nextSpawn < Date.now()) {

			let letter = new GameObject('letter');
			let pos = this.boardArray.length;

			this.boardArray[pos] = letter;
			// console.log("###################################",letter.id);

			letter.render = new Render('./boutonLettersA.gif');
			letter.setPosition(1340, 252);
			letter.addScript(new LetterScript(pos, 'a'));
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

		if (this.boardArray[0]) {
			GameObject.deleteGameObject(this.boardArray[0]);
			this.boardArray[0] = undefined;
			console.log(this.boardArray);
		}
	}
}

export default SpawnerScript;
