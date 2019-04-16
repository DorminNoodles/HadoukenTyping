

class Core {

	constructor() {
		this.nextId = 1;
		this.gameObjectList = [];
	}

	addObject(obj) {
		let id = this.nextId;

		this.nextId++;
		this.gameObjectList[id] = obj;
		return id;
	}

	getGameObjectList() {
		return this.gameObjectList;
	}

	update() {

		this.gameObjectList.forEach((objet) => {
			if (objet.script) {
				objet.script.update();
			}
		});
	}

	deleteObject(id) {
		// console.log(this.gameObjectList);
		delete this.gameObjectList[id];
	}
}

export default new Core();
