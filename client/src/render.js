
class Render {

	constructor(src) {
		this.img = new Image();
		this.img.src = src;
		console.log("hello in render it's a component");
	}

	sayHello() {
		console.log("Hello from render  {{{{{{{}}}}}}}");
	}
}


export default Render;
