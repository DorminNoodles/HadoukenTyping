import Core from './core'

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
		console.log("DELETE >>>> ", object.name);
		console.log("DELETE >>>> ", object.id);
		console.log("DELETE >>>> ", object);
		console.log(object);
		if (object.script && object.script.childs) {
			console.log("DELETE 2");
			console.log("DELETE 3", object.script.childs);
			let childs = object.script.childs;

			console.log("DELETE 4", childs);
			console.log("DELETE 4", object.script.childs.length);
			for( var el in childs ) {
				console.log("name object >>", el);
				console.log("name object >>", childs[el].id);
				console.log("name object >>", childs[el].name);
				GameObject.delete(childs[el]);
			}
		}
		if (object.script)
			object.script = undefined;
		console.log(object.name);
		Core.deleteObject(object.id);
	}
}

export default GameObject;
