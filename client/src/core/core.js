/*
	List of all gameObjects
*/

let gameObjectList = [];

// class Core {

// 	constructor() {
// 		this.nextId = 1;
// 		this.gameObjectList = [];
// 	}

// 	addObject(obj) {
// 		let id = this.nextId;

// 		this.nextId++;
// 		this.gameObjectList[id] = obj;
// 		return id;
// 	}

// 	getGameObjectList() {
// 		return this.gameObjectList;
// 	}

export function	update() {
	// console.log('core update');
	gameObjectList.forEach((object) => {

		if (object.script && object.script.update) {
			object.script.update();
		}
		object.update();
	});
}

export function deleteObject(object) {
	delete gameObjectList[object.id];
}
// export default new Core();
// export default

export function addObject(obj) {
	let id = gameObjectList.length;

	gameObjectList[id] = obj;
	return id;
}

export function getGameObjectList() {
	return gameObjectList;
}