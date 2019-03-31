

class ComboScript {

	constructor() {
		this.speed = -5;
		setTimeout(() => {this.speed += 1}, 200);
		setTimeout(() => {this.speed += 1}, 400);
		setTimeout(() => {this.speed += 1}, 600);
		setTimeout(() => {this.speed += 1}, 800);
		setTimeout(() => {this.speed += 1}, 1000);
	}

	update() {
		this.object.move(0, this.speed);
	}
}

export default ComboScript;
