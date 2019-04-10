import GameObject from './gameObject';


class Script {

	constructor() {
		this.eventListeners = [];
		this.objs = [];
	}

	static delete(script) {
		Script.deleteAllListeners(script);
		for (let obj in script.objs) {
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

	deleteObject(obj){
		// for
		console.log("DELETE IN SCRIPT > ", obj.id);
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
