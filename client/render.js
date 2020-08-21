


class Render {

	constructeur () {
		this.allObjects = [];

	}

	static subscribe(obj){
		this.allObjects.push(obj);

	}

	getObj(){
		return this.allObjects;
	}
}


export default Render;
