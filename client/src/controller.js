

class Controller {

	constructor(spawner) {

		console.log("the spawner itself : ", spawner);
		document.addEventListener('keydown', (e) => {
			this.handler(e);
		});
		// this.boardArray = boardArray;
		// console.log("constructor : ", this.boardArray);
		this.spawner = spawner;
	}

	update() {
		// console.log("in controller", this.boardArray);
		// console.log("in controller", this.boardArray[0]);
		// console.log("controller");
	}

	handler(e) {

		this.spawner.script.deleteLetter(e.key);
		// console.log(e);
		// console.log("in handler", this.boardArray[0]);
		// console.log("undefined ? connard :", this.boardArray[0]);
		// this.boardArray[0] = false;


	}
}

export default Controller;
