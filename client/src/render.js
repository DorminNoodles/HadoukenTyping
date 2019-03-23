
class Render {

	constructor(src) {
		this.anim = [];
		this.currentAnim;
		this.img = new Image();
		this.img.src = src;

		// if (anim) {
		// 	console.log("hello in render it's a component");
		// 	this.frameNb = frameNb;
		// 	this.currentFrame = 0;
		// 	this.width = width;
		// 	this.height = height;
		// 	this.row = row;
		// 	this.speed = speed;
		// 	this.nextFrameTime = 0;
		// 	this.anim[anim.name] = anim
		// }
		this.isAnimated = false;
		this.currentFrame = 0;
	}

	addAnim(path) {
		let anim = require(path).default;
		console.log(anim);
		this.isAnimated = true;
		this.currentAnim
		this.anim[anim.name] = anim;
	}


	draw(ctx, x, y) {
		if (this.img) {
			if (this.isAnimated)
				this.drawAnim(this.img, x, y);
			else
				ctx.drawImage(this.img, x, y);
		}

	}

	drawAnim(ctx, x, y) {

		// console.log("HELLO >> ", this.anim);

		let anim = this.anim[this.currentAnim]
		let sX = anim.width * this.currentFrame;
		let sY = anim.height * anim.row;
		let width = anim.width;
		let height = anim.height;
		let speed = anim.speed;

		ctx.drawImage(anim.img,
			sX,
			sY,
			width,
			height,
			x,
			y,
			width,
			height
		);

		// if (this.nextFrameTime < Date.now()) {
		// 	this.currentFrame = (this.currentFrame + 1) % this.frameNb;
		// 	this.nextFrameTime = Date.now() + this.speed;
		// }
	}


	changeAnim(currentAnim) {
		this.currentAnim = currentAnim;
	}

}

export default Render;
