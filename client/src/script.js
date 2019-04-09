

class Script {

	constructor() {
		this.eventListeners = [];
		this.objs = [];
	}

	static delete(script) {
		Script.deleteAllListeners(script);

	}

	newObject(obj) {
		this.objs.push(obj);
		return obj;
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
