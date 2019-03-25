import Core from './core'

class GameObject {

	constructor(name) {
		this.id = Core.addObject(this);
		this.name = name;
		this.render;
		this.script;
		this.x = 0;
		this.y = 0;
	}

	static listOfAll() {
		console.log("Test {{{{{{{{}}}}}}}}");
		return Core.getGameObjectList();
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}

	move(x, y) {
		this.x = this.x + x;
		this.y = this.y + y;
	}

	addScript(script) {
		script.gameObjectId = this.id;
		this.script = script;
		script.object = this;
	}

	static getGameObject(id) {
		let list = Core.getGameObjectList();


		for (let i = 0; i < list.length; i++) {
			if (list[i] && list[i].id === id) {
				return list[i];
			}
		}
	}

	static delete(objet) {

		Core.deleteObject(objet.id);
	}
}

export default GameObject;
