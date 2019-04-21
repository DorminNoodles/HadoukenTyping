import GameObject from './gameObject';


class Script {

	constructor() {
		this.eventListeners = [];
		this.childs = [];
	}

	static delete(script) {
		Script.deleteAllListeners(script);
		for (let obj in script.childs) {
			GameObject.delete(script.childs[obj]);
			delete script.childs[obj];
		}

	}

	newObject(obj) {
		this.childs.push(obj);
		return obj;
	}

	addListener(name, func) {
		this.eventListeners.push({'name': name, 'func': func});
		document.addEventListener(name, func);
	}

	deleteObject(obj){

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
