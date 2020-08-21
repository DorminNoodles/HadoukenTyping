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
		this.parent = {
			x: 0,
			y: 0,
		};
		this.childs = [];

		// RenderManager.addObject(this);
	}

	static listOfAll() {
		return Core.getGameObjectList();
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;

		this.childs.forEach((child) => {
			let localX = child.x - child.parent.x;
			let localY = child.y - child.parent.y;
			child.setParentPosition(x, y);
			child.setPosition(child.parent.x + localX, child.parent.y + localY);
		})
	}

	getPosition() {
		return ({
			'x': this.x,
			'y': this.y
		});
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

	addGameObject(obj) {
		this.childs.push(obj);

		//GameObject give position from parent
		obj.setParentPosition(this.x, this.y);
		//gameObject set to parent position by default
		obj.setPosition(this.x, this.y);
		return obj;
	}

	setLocalPosition(x, y) {
		//position from gameobject parent
		this.local.x = x;
		this.local.y = y;
		this.x = x + this.parent.x;
		this.y = y + this.parent.y;
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

		// Core.deleteObject(object.id);
	}

	update() {

	}

	addRender(render) {
		this.render = render;
		RenderManager.addObject(this);
	}
}

export default GameObject;
