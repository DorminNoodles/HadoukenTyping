import Script from './script';

class Controller extends Script{

	constructor(spawner) {

		super();

		this.keyList = [];


		this.addListener('keydown', (e) => {
			if (!this.keyList[e.keyCode]) {
				this.keyList[e.keyCode] = true;
				this.handler(e);
				this.arrowKey(e);
			}
		});


		this.addListener('keyup', (e) => {
			if (this.keyList[e.keyCode])
				delete this.keyList[e.keyCode];
		});
		this.spawner = spawner;
	}

	update() {

	}

	arrowKey(e) {
		if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
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
