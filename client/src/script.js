import GameObject from './gameObject';


class Script {

	constructor() {
		this.eventListeners = [];
		this.objs = [];
	}

	static delete(script) {
		console.log("DELETE SCRIPT : ", script);
		Script.deleteAllListeners(script);
		for (let obj in script.objs) {
			console.log("1234 > ", script.objs[obj].name);
			// console.log()
			GameObject.delete(script.objs[obj]);
			delete script.objs[obj];
		}

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
