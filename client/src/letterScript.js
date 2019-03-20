import GameObject from './gameObject';

class LetterScript {

	constructor(position, letter) {
		this.gameObjectId;
		this.begin = Date.now();
		this.speedRefresh = 1000/60;
		this.nextRefresh = 0;
		this.moveSpeed = 10;
		// this.state = 'drop';
		this.state = this.drop;
		this.position = position;
		this.letter = letter;
		// this.spaceAvailable = spaceAvailable;
		// console.log(position);
		this.deadMove = -20;

	}

	update() {

		if (this.nextRefresh < Date.now()) {
			this.nextRefresh = Date.now() + this.speedRefresh;
			this.state();
		}
	}

	drop() {
		this.vulnerable = false;
		if (this.object.y < 500) {
			this.object.move(0, 15);
		}
		if (this.object.y > 500 ) {
			this.object.setPosition(this.object.x, 500);
			this.state = this.onBoard;
		}
	}

	onBoard() {
		this.vulnerable = true;
		let destination = (this.position * 82) + 200;
		// console.log("id : ", this.gameObjectId, "   position : ", this.position, "     destination : ", destination);
		if (this.object.x > destination) {
			this.object.move(-10, 0);
		}

		if (this.object.x < destination) {
			this.object.x = destination;
		}
	}

	dead() {
		this.object.move(0, this.deadMove);
		this.deadMove += 5;
		// console.log("DEAD !!!!");
	}

	deleteLetter(objet) {
		let obj = GameObject.getGameObject(this.gameObjectId);
		console.log(objet);
		console.log("this => ", this.gameObjectId);
		console.log("deleteLetter : ", obj);

		this.state = this.dead;


		setTimeout(() => {
			console.log("DELETE ########################");
			console.log(this);
			// GameObject.deleteGameObject();
		}, 200);
	}

	isVulnerable() {
		return this.vulnerable;
	}

	changePosition() {
		this.position--;
	}
}

export default LetterScript;
