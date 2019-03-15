

class Core {

	constructor() {
		this.gameObjectList = [];
	}

	addObject(obj) {
		this.gameObjectList.push(obj);
	}

	getGameObjectList() {
		return this.gameObjectList;
	}
}

export default new Core();
