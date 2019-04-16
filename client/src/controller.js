import Script from './script';

class Controller extends Script{

	constructor(spawner) {

		super();

		this.addListener('yolo', () => {
			this.yoloFunc(this);
		});

		let testEvent = new Event('yolo');
		// document.dispatchEvent(testEvent);
		// this.deleteAllListeners();
		// document.dispatchEvent(testEvent);
		// document.dispatchEvent(testEvent);


		this.keyList = [];

		console.log("the spawner itself : ", spawner);

		this.addListener('keydown', (e) => {
			if (!this.keyList[e.keyCode]) {
				this.keyList[e.keyCode] = true;
				this.handler(e);
				this.arrowKey(e);
			}
		});

		// document.addEventListener('keydown', (e) => {
		// 	if (!this.keyList[e.keyCode]) {
		// 		this.keyList[e.keyCode] = true;
		// 		this.handler(e);
		// 		this.arrowKey(e);
		// 	}
		// });

		this.addListener('keyup', (e) => {
			if (this.keyList[e.keyCode])
				delete this.keyList[e.keyCode];
		});

		// setTimeout(() => {
		// 	this.deleteAllListeners();
		// }, 4000);

		// document.addEventListener('keyup', (e) => {
		// 	if (this.keyList[e.keyCode])
		// 		delete this.keyList[e.keyCode];
		// })
		this.spawner = spawner;
	}

	yoloFunc(self) {
		console.log("************ YOOOOOOLOOOOOOO ********");
		console.log("eventListeners >>>>>>>>> ", self.eventListeners);
	}

	update() {
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
