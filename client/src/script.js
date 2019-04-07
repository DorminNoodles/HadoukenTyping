

class Script {

	constructor() {
		this.eventListeners = [];
	}

	static delete(script) {
		Script.deleteAllListeners(script);

	}

	addListener(name, func) {
		this.eventListeners.push({'name': name, 'func': func});
		document.addEventListener(name, func);
	}

	static deleteAllListeners(s) {
		if (s.eventListeners) {
			let list = s.eventListeners;
			for (let key in list) {
				console.log(key);
				document.removeEventListener(list[key].name, list[key].func);
			}
		}
	}

	emit() {

	}

}

export default Script;
