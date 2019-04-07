

class Controller {

	constructor(spawner) {

		this.keyList = [];
		console.log("the spawner itself : ", spawner);
		document.addEventListener('keydown', (e) => {
			if (!this.keyList[e.keyCode]) {
				this.keyList[e.keyCode] = true;
				this.handler(e);
				this.arrowKey(e);
			}
		});
		document.addEventListener('keyup', (e) => {
			if (this.keyList[e.keyCode])
				delete this.keyList[e.keyCode];
		})
		this.spawner = spawner;
	}

	update() {
		// console.log("in controller", this.boardArray);
		// console.log("in controller", this.boardArray[0]);
		// console.log("controller");
	}

	arrowKey(e) {
		if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
			console.log("in arrow key control", e.keyCode);
			let arrowEvent = new CustomEvent("ArrowKey", {
				detail : {
					'keyCode': e.keyCode
				},
				"bubbles":true,
				"cancelable":false
			});
			document.dispatchEvent(arrowEvent);
		}
	}

	handler(e) {
		// console.log(e.key);
		if (e.keyCode >= 65 && e.keyCode <= 90)
			this.spawner.script.deleteLetter(e.key.toLowerCase());
	}
}

export default Controller;
