import Core from './core'

class GameObject {

	constructor(name) {
		Core.addObject(this);
		this.name = name;
		this.render;
	}

	static listOfAll() {
		console.log("Test {{{{{{{{}}}}}}}}");
		return Core.getGameObjectList();
	}

}

export default GameObject;
