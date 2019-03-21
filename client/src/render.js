
class Render {

	constructor(anim) {
		this.anim = [];
		// if (anim) {
		// 	this.img = new Image();
		// 	this.img.src = src;
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
		this.currentFrame = 0;
	}

	addAnim(anim) {
		this.anim[anim.name] = anim;
	}

	draw(ctx, x, y) {

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

		if (this.nextFrameTime < Date.now()) {
			this.currentFrame = (this.currentFrame + 1) % this.frameNb;
			this.nextFrameTime = Date.now() + this.speed;
		}
	}

	changeAnim(currentAnim) {
		this.currentAnim = currentAnim;
	}

}

export default Render;
