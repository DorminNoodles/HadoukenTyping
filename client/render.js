


class Render {

	constructeur () {
		this.allObjects = [];

		console.log("RENDER")
	}

	static subscribe(obj){
		this.allObjects.push(obj);

	}

	getObj(){
		return this.allObjects;
	}
}


export default Render;
