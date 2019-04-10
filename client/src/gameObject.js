import Core from './core';
import Script from './script';

class GameObject {

	constructor(name) {
		this.id = Core.addObject(this);
		this.name = name;
		this.render;
		this.script;
		this.x = 0;
		this.y = 0;
		this.childs = [];
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
		console.log("ADD SCRIPT ###############", this);
		script.gameObjectId = this.id;
		this.script = script;
		script.object = this;
	}

	addChild(obj) {
		this.childs.push(obj);
	}

	getChild(obj) {

	}

	getChilds() {
		return this.childs;
	}

	static getGameObject(id) {
		let list = Core.getGameObjectList();


		for (let i = 0; i < list.length; i++) {
			if (list[i] && list[i].id === id) {
				return list[i];
			}
		}
	}

	static delete(object) {
		if (object.script) {
			Script.delete(object.script);
		}

		if (object.script && object.script.childs) {
			let childs = object.script.childs;
			for( var el in childs ) {
				GameObject.delete(childs[el]);
			}
		}

		if (object && object.childs) {
			let childs = object.childs;
			for( var el in childs ) {
				GameObject.delete(childs[el]);
				delete childs[el];
			}
		}

		console.log("OBJECT DELETE 3 > ", object.name);
		Core.deleteObject(object.id);
	}
}

export default GameObject;
