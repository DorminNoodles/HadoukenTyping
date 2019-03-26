

class Controller {

	constructor(spawner) {

		this.keyList = [];
		console.log("the spawner itself : ", spawner);
		document.addEventListener('keydown', (e) => {
			if (!this.keyList[e.key]) {
				this.keyList[e.key] = true;
				this.handler(e);
			}
		});
		document.addEventListener('keyup', (e) => {
			if (this.keyList[e.key])
				delete this.keyList[e.key];
		})
		this.spawner = spawner;
	}

	update() {
		// console.log("in controller", this.boardArray);
		// console.log("in controller", this.boardArray[0]);
		// console.log("controller");
	}

	handler(e) {
		// console.log(e.key);
		this.spawner.script.deleteLetter(e.key);
	}
}

export default Controller;
