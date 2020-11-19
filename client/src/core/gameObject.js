import * as Core from './core';
import Script from './script';
import * as RenderManager from '../renderManager';


class GameObject {

	constructor(name = 'noName') {

		//On garde tous les gameobjects dans une list
		this.id = Core.addObject(this);
		// this.id = 2;

		this.name = name;
		this.render;
		this.script;
		this.x = 0;
		this.y = 0;
		this.local = {
			x: 0,
			y: 0
		};
		// this.parent = {
		// 	x: 0,
		// 	y: 0,
		// };
		this.childs = [];
		this.eventListeners = [];
		this.isEnabled = true;

		// let save = document.dispatchEvent;

		// document.dispatchEvent = (param) => {
		// 	console.log(param);
		// 	save(param);
		// }

		// RenderManager.addObject(this);
	}

	static listOfAll() {
		return Core.getGameObjectList();
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
		this.local.x = x;
		this.local.y = y;

		// this.childs.forEach((child) => {
		// 	let localX = child.x - child.parent.x;
		// 	let localY = child.y - child.parent.y;
		// 	child.setParentPosition(x, y);
		// 	child.setPosition(child.parent.x + localX, child.parent.y + localY);
		// })
	}

	getPosition() {
		if (this.parent) {
			return {
				x: this.parent.getPosition().x + this.local.x,
				y: this.parent.getPosition().y + this.local.y,
			};
		}
		return {
			x: this.local.x,
			y: this.local.y,
		}
	}

	move(x, y) {
		this.x = this.x + x;
		this.y = this.y + y;
	}

	addScript(script) {
		script.gameObjectId = this.id;
		script.gameObject = this;
		this.script = script;
		//script.object outdated
		script.object = this;
	}

	addChild(obj) {
		this.childs.push(obj);
	}

	deleteAllChilds() {
		this.childs.forEach((child) => {
			GameObject.delete(child);
		})
		this.childs = [];
	}

	setParent(parent) {
		this.parent = parent;
	}

	addGameObject(obj) {
		this.childs.push(obj);
		obj.setParent(this);
		obj.setLocalPosition(this.x, this.y);
		return obj;
	}

	setLocalPosition(x, y) {
		//position from gameobject parent
		this.local.x = x;
		this.local.y = y;
		// this.x = x + this.parent.getPosition().x;
		// this.y = y + this.parent.getPosition().y;
	}

	setParentPosition(x, y) {
		this.parent.x = x;
		this.parent.y = y;
		// this.setLocalPosition(this.x, this.y);
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

		// if (object.script) {
		// 	Script.delete(object.script);
		// }

		// if (object.script && object.script.childs) {
		// 	let childs = object.script.childs;
		// 	for( var el in childs ) {
		// 		GameObject.delete(childs[el]);
		// 	}
		// }

		if (object && object.childs) {
			let childs = object.childs;
			for( var el in childs ) {
				GameObject.delete(childs[el]);
				delete childs[el];
			}
		}

		if (object.eventListeners) {
			object.eventListeners.forEach((elem) => {
				console.log("efe320: ", elem.name);
				document.removeEventListener(elem.name, elem.func);
			});
		}

		if (object.render) {
			RenderManager.deleteObject(object);
		}
		Core.deleteObject(object);
	}

	update() {

	}

	addRender(render) {
		this.render = render;
		RenderManager.addObject(this);
		return render;
	}

	deleteRender() {
		if (this.render) {
			RenderManager.deleteObject(this);
		}
	}

	addListener(name, func) {
		this.eventListeners.push({'name': name, 'func': func});
		document.addEventListener(name, (e) => {
			let find = this.eventListeners.find((elem) => {
				return elem.type ===  e.name;
			});
			if (find && this.isEnabled)
				find.func(e);
		});

		if (this.name == "MainBoard")  {
			console.log("312ddw: add event listeners > ", this.eventListeners);
		}
	}

	removeListener(name, func) {

	}

	disable() {
		this.isEnabled = false;
		if (this.render)
			this.render.stop();
		this.childs.forEach(child => {
			child.disable();
		});
	}
}

export default GameObject;
